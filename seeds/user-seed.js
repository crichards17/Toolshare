const User = require('../models/User')
const userData=[
    {
        user_name: "Tom"
    }
]

const seedUserData= () => User.bulkCreate(userData);

module.exports= seedUserData