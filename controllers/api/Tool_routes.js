const router = require('express').Router();
const { Tool,  User, ToolCategories, ToolType, ToolMake } = require('../../models');
const withAuth = require('../../utils/auth')


// The `/api/Tools` endpoint

// get all Tools
router.get('/', withAuth, async (req, res) => {
  // find all Tools


  //NOTE: This try catch block was used just to test the relationships. This statement gives the user tool data in JSON format. If it needs to be deleted, feel free.
    try{
      const getTools= await Tool.findAll({
        include:[{ model: User }, {model: ToolCategories}, {model:ToolType}, {model:ToolMake}]
      }) 
     
      // res.status(200).json(getTools)
      const toolStringed= JSON.stringify(getTools)
      res.render(toolStringed, {
        logged_in:req.session.logged_in
      })
    }
    catch(err){
      res.status(500).json(err)
    }
});
router.get('/UsersLogin', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('Userlogin');
});

// get one Tool
// find a single Tool by its `id`
  // be sure to include its associated Tag data
router.get('/:id', async(req, res) => {
  try {
    const toolData = await Tool.findOne({
      where:{
        id: req.params.id,
      },
      include:[ToolCategories, ToolType, ToolMake]
    })
    if (!toolData) {
      res.status(404).json({ message: 'No Tool found with this id!' });
      return;
    }

    res.status(200).json(toolData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new Tool
router.post('/', (req, res) => {
  Tool.create(req.body
    // {
    //   tool_name: "jigsaw",
    //   tool_description: "used",
    //   asking: 3,
    //   user_id: 8,
    //   tool_categories_id: 1,
    //   tool_type_id: 2,
    //   tool_make_id: 3
    // }

  ).then(() => {
    res.send('Created Success!');
  });

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
      return Tool.findAll({ where: { tool_id: req.params.id } });
    })
    .then((Tool) => {
      // get list of current tag_ids
      const ToolIds = Tool.map(({ tool_id }) => tool_id);
      // create filtered list of new tag_ids
      const newTool = req.body.toolIds
        .filter((tool_id) => !ToolIds.includes(tool_id))
        .map((tool_id) => {
          return {
            Tool_id: req.params.id,
            tool_id,
          };
        });
      // figure out which ones to remove
      const ToolToRemove = Tool
        .filter(({ tool_id }) => !req.body.toolIds.includes(tool_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        Tool.destroy({ where: { id: ToolToRemove } }),
        Tool.bulkCreate(newTool),
      ]);
    })
    .then((updatedTool) => res.json(updatedTool))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one Tool by its `id` value
});

module.exports = router;