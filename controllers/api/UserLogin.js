const router = require('express').Router();
const bcrypt = require('bcrypt');
// const User = require('../../models/User');
const {User} = require ('../../models')

// Added comments describing the functionality of this `login` route

router.get('/sessData', async(req,res)=>{
  let data= ''
    if(req.session.logged_in===true){
      
      data=true
    }
    if (!req.session.logged_in){
    
     data=false
    }
    
   if (data===true){
     res.status(200).json()
   }
   if(data===false){
     res.status(201).json()
   }
})




router.post('/login', async (req, res) => {
 
  try {
    // we search the DB for a user with the provided email
    
  
    const userData = await User.findOne({ where: 
      {email: req.body.email} });
    
      console.log('test')
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
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }
    // if they do match, return success message
   
    req.session.save(()=>{
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ message: 'You are now logged in!' });
    })
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/logout', (req,res)=>{
  console.log('TEEEEEEEEEEEEEEEEEEST')
if (req.session.logged_in) {
    req.session.destroy(() => {
      res.render('homepage')
    });
  } else {
    // res.status(404).end();
    res.render('homepage')
  }
})


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
router.post('/create', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
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
