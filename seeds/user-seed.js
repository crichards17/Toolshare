const User = require('../models/User')
const userData=[
    {
        user_name: "Tom",
        email:"Tom@gmail.com",
        password: "password"
    },
    {
        user_name: "Bill",
        email:"Bill@gmail.com",
        password:"password"
    },
    {
        user_name: "Even",
        email:"Even@gmail.com",
        password:"password"
    },
    {
        user_name: "Bob",
        email:"Bob@gmail.com",
        password:"password"
    },
    {
        user_name: "Jack",
        email:"Jack@gmail.com",
        password:"password"
    },
]

const seedUserData= () => User.bulkCreate(userData, { individualHooks: true });

module.exports= seedUserData