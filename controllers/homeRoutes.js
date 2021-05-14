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
  // Find the logged in user based on the session ID
  router.get('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Tool }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
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
            exclude: ['password'],
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
      // 
      console.log(tools);
      // 
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

  

  module.exports = router;
  