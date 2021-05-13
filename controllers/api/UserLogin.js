const router = require('express').Router();
const bcrypt = require('bcrypt');
// const User = require('../../models/User');
const {User} = require ('../../models')

// Added comments describing the functionality of this `login` route
router.post('/login', async (req, res) => {
  // console.log(req.body.email)
  try {
    // we search the DB for a user with the provided email
    
    console.log('TESTINGLOGIN')
    const userData = await User.findOne({ where: 
      {email: req.body.email} });
    
   
    if (!userData) {
      // the error message shouldn't specify if the login failed because of wrong email or password
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }
    // use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    // if they do not match, return error message
    if (req.body.password != userData.password) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }
    // if they do match, return success message
    console.log('TESTINGLOGIN2')
    req.session.save(()=>{
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ message: 'You are now logged in!' });
    })
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET one user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    // hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, 10);
    // create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// PUT update a user
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
