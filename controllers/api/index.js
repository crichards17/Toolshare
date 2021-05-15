const router = require('express').Router();
// const userRoutes = require('./userRoutes');
const Tool_routes = require('./Tool_routes');
const UserLogin = require('./UserLogin');
const searchRoutes = require('./searchRoutes')


// router.use('/users', userRoutes);
router.use('/Tool', Tool_routes);
router.use('/UsersLogin', UserLogin);
router.use('/searchRoutes', searchRoutes);

module.exports = router;