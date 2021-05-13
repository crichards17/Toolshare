const User = require('../models/User')
const userData=[
    {
        user_name: "Tom",
        email:"Tom@gmail.com",
        password: 'password12345'
    },
    {
        user_name: "Bill",
        email:"Bill@gmail.com"
    },
    {
        user_name: "Even",
        email:"Even@gmail.com"
    },
    {
        user_name: "Bob",
        email:"Bob@gmail.com"
    },
    {
        user_name: "Jack",
        email:"Jack@gmail.com"
    },
]

const seedUserData= () => User.bulkCreate(userData);

module.exports= seedUserData