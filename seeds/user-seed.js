const User = require('../models/User')
const userData=[
    {
        user_name: "Tom",
        user_email:"test@gmail.com"
    }
]

const seedUserData= () => User.bulkCreate(userData);

module.exports= seedUserData