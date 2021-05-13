const router = require('express').Router();
const { Tool, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all Tools and JOIN with user data
    const ToolData = await Tool.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const Tools = ToolData.map((Tool) => Tool.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      Tools, 
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
  
  router.get('/Tools', async (req, res) => {
    // find all Tools
  //NOTE: This try catch block was used just to test the relationships. This statement gives the user tool data in JSON format. If it needs to be deleted, feel free.
  try {
    const ToolsData = await Tool.findAll({
      include:[ToolCategories, ToolType, ToolMake]
    })
    res.status(200).json(ToolsData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

  

  

  module.exports = router;
  