const router = require('express').Router();
const Tool_routes = require('./Tool_routes');
const UserLogin = require('./UserLogin');


router.use('/Tool', Tool_routes);
router.use('/UsersLogin', UserLogin);

module.exports = router;