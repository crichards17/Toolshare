const User = require('../models/User')
const userData=[
    {
        user_name: "Tom",
        user_email:"Tom@gmail.com",
        password: 'password12345'
    },
    {
        user_name: "Bill",
        user_email:"Bill@gmail.com"
    },
    {
        user_name: "Even",
        user_email:"Even@gmail.com"
    },
    {
        user_name: "Bob",
        user_email:"Bob@gmail.com"
    },
    {
        user_name: "Jack",
        user_email:"Jack@gmail.com"
    },
]

const seedUserData= () => User.bulkCreate(userData);

module.exports= seedUserData