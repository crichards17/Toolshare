const router = require('express').Router();
// const { Tool, Tag} = require('../../models');
const User = require('../../models/User');
const Tool =require('../../models/Tool')

// The `/api/Tools` endpoint

// get all Tools
router.get('/', async (req, res) => {
  // find all Tools
  // be sure to include its associated Category and Tag data
    try{
      const getTools= await Tool.findAll({
        include:[{model: User}]
      }) 
      res.status(200).json(getTools)
    }
    catch(err){
      res.status(500).json(err)
    }
});

// get one Tool
router.get('/:id', (req, res) => {
  // find a single Tool by its `id`
  // be sure to include its associated Tag data
});

// create new Tool
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      Tool_name: "Axe",
      price: 20.00,
      tagIds: [1, 2, 3, 4]
    }
  */
  Tool.create(req.body)
    .then((Tool) => {
      // if there's Tool tags, we need to create pairings to bulk create in the ToolTag model
      if (req.body.tagIds.length) {
        const ToolTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            Tool_id: Tool.id,
            tag_id,
          };
        });
        return ToolTag.bulkCreate(ToolTagIdArr);
      }
      // if no Tool tags, just respond
      res.status(200).json(Tool);
    })
    .then((ToolTagIds) => res.status(200).json(ToolTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update Tool
router.put('/:id', (req, res) => {
  // update Tool data
  Tool.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((Tool) => {
      // find all associated tags from ToolTag
      return ToolTag.findAll({ where: { Tool_id: req.params.id } });
    })
    .then((ToolTags) => {
      // get list of current tag_ids
      const ToolTagIds = ToolTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newToolTags = req.body.tagIds
        .filter((tag_id) => !ToolTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            Tool_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const ToolTagsToRemove = ToolTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ToolTag.destroy({ where: { id: ToolTagsToRemove } }),
        ToolTag.bulkCreate(newToolTags),
      ]);
    })
    .then((updatedToolTags) => res.json(updatedToolTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one Tool by its `id` value
});

module.exports = router;