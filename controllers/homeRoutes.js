const router = require('express').Router();
const { Tool, User, ToolType, ToolMake, ToolCategories } = require('../models');
const withAuth = require('../utils/auth');
// -------------------------
const {Client} = require("@googlemaps/google-maps-services-js");
// ---------------------------

router.get('/', async (req, res) => {
  try {
    res.render('homepage', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/Tool/:id', async (req, res) => {
    try {
      const ToolData = await Tool.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['user_name'],
          },
        ],
      });
  
      const Tool = ToolData.get({ plain: true });
  
      res.render('Tool', {
        ...Tool,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/tools', async (req, res) => {
    try {
      // Get all tools and JOIN with user data
      const toolsData = await Tool.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            }
          },
          {
            model: ToolType
          },
          {
            model: ToolMake
          },
          {
            model: ToolCategories
          }
        ],
      });
      const type= await ToolType.findAll()
      const types= type.map((type)=>type.get({plain: true}))
      const categorie= await ToolCategories.findAll()
      const categories= categorie.map((cat)=>cat.get({plain: true}))
      
      // Serialize data so the template can read it
      const tools = toolsData.map((tool) => tool.get({ plain: true }));

      // If signed in, gather Distance data
      if (req.session.logged_in) {
        const userData = await User.findByPk(req.session.user_id);
        
        const client = new Client({});

        let destinations = [];
        for (let i = 0; i < tools.length; i++) {
          destinations.push(tools[i].user.user_address);
        }
        const r = await client.distancematrix({
          params: {
            origins: [userData.user_address],
            destinations: destinations,
            key: "AIzaSyBBTVJl80HHBH6qEf-E22Pze_2V7yzLJFc",
            units: "imperial"
          },
          timeout: 2000, // milliseconds
        });
        const results = r.data.rows[0].elements;
        for (let i = 0; i < results.length; i++) {
          tools[i].distance = parseFloat(results[i].distance.value * .00061).toFixed(2);
        }
      }

  
      // Pass serialized data and session flag into template
      res.render( 'tools', { 
        tools,
        types,
        categories,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      });
   
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/profile', withAuth, async (req, res) => {
    
    try {
      // Find the logged-in user's tools based on the session ID
      const toolsData = await Tool.findAll({
        include: [
          {
            model: User,
            where: {
              id: req.session.user_id
            },
            attributes: {
              exclude: ['password'],
            }
          },
          {
            model: ToolType
          },
          {
            model: ToolMake
          },
          {
            model: ToolCategories
          }
        ],
      });
      // Serialize data so the template can read it
      const myTools = toolsData.map((tool) => tool.get({ plain: true }));
  
      // Get all categories for categories dropdown
      const categoriesData = await ToolCategories.findAll();
      const categories = categoriesData.map((categorie) => categorie.get({ plain: true }));

      // Get all makes for makes dropdown
      const makesData = await ToolMake.findAll();
      const makes = makesData.map((make) => make.get({ plain: true }));

      // Get all ToolTypes for categories dropdown
      const typeData = await ToolType.findAll();
      const types = typeData.map((type) => type.get({ plain: true }));

      res.render('profile', {
        myTools,
        categories,
        makes,
        types,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

  router.get('/create', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('create');
  });
  // get one Tool
// find a single Tool by its `id`
router.get('/Tool/:id', async(req, res) => {
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

router.get('/search/type/:type/category/:category/distance/:distance', async(req,res)=>{
  try {
    
    const searchCat = req.params.category;
    const searchType = req.params.type;
    console.log(`category: ${searchCat}, type: ${searchType}`)
    let toolsData = {};
    if (searchCat === "all" && searchType === "all") {
      toolsData = await Tool.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            }
          },
          {
            model: ToolType
          },
          {
            model: ToolMake
          },
          {
            model: ToolCategories
          }
        ],
      });
    } else if (searchType === "*") {
      toolsData = await Tool.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            }
          },
          {
            model: ToolType
          },
          {
            model: ToolMake
          },
          {
            model: ToolCategories
          }
        ],
        where: {
          tool_categories_id: searchCat
        },
      });
    } else if (searchCat === "*") {
      toolsData = await Tool.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            }
          },
          {
            model: ToolType
          },
          {
            model: ToolMake
          },
          {
            model: ToolCategories
          }
        ],
        where: {
          tool_type_id: searchType
        },
      });
    } else {
      toolsData = await Tool.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            }
          },
          {
            model: ToolType
          },
          {
            model: ToolMake
          },
          {
            model: ToolCategories
          }
        ],
        where: {
          tool_type_id: searchType,
          tool_categories_id: searchCat
        },
      });
    }
    
    // Serialize Tool data so the template can read it
    const plainTools = toolsData.map((tool) => tool.get({ plain: true }));

    // If signed in, gather Distance data
    if (req.session.logged_in && plainTools.length > 0) {
      const userData = await User.findByPk(req.session.user_id);
      
      const client = new Client({});

      let destinations = [];
      for (let i = 0; i < plainTools.length; i++) {
        destinations.push(plainTools[i].user.user_address);
      }
      const r = await client.distancematrix({
        params: {
          origins: [userData.user_address],
          destinations: destinations,
          key: "AIzaSyBBTVJl80HHBH6qEf-E22Pze_2V7yzLJFc",
          units: "imperial"
        },
        timeout: 2000, // milliseconds
      });
      const results = r.data.rows[0].elements;

      for (let i = 0; i < results.length; i++) {
        plainTools[i].distance = parseFloat(results[i].distance.value * .00061).toFixed(2);
      }
    }

    // Apply distance filter
    let tools = [];
    if (req.params.distance !== "*") {
      tools = plainTools.filter(tool => parseFloat(tool.distance) < parseFloat(req.params.distance));
    } else {
      tools = plainTools;
    }

    // Datasets for filter dropdowns
    const type= await ToolType.findAll()
    const types= type.map((type)=>type.get({plain: true}))
    const category= await ToolCategories.findAll()
    const categories= category.map((cat)=>cat.get({plain: true}))

    // Pass serialized data and session flags into template
    res.render( 'tools', { 
      tools,
      types,
      categories,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
 
  } catch (err) {
    res.status(500).json(err);
  }
});

  module.exports = router;
  