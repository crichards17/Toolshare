const router = require('express').Router();
const { Tool, User, ToolType, ToolMake, ToolCategories } = require('../models');
const withAuth = require('../utils/auth');

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
  
      // Serialize data so the template can read it
      const tools = toolsData.map((tool) => tool.get({ plain: true }));
      // // 
      // console.log(tools);
      // // 
      // Pass serialized data and session flag into template
      res.render('tools', { 
        tools, 
        logged_in: req.session.logged_in,
        user_id: req.session.user_id
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/profile', withAuth, async (req, res) => {
    // 
    console.log(`user ID: ${req.session.user_id}`);
    // 
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
      // // 
      // console.log(myTools);
      // // 
  
      res.render('profile', {
        myTools,
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
  

  module.exports = router;
  