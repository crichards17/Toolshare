const User = require('../models/User')
const userData=[
    {
        user_name: "Tom",
        email:"Tom@gmail.com",
        password: "password",
        user_address:'301 Union St, Seattle, WA 98101'
    },
    {
        user_name: "Bill",
        email:"Bill@gmail.com",
        password:"password",
        user_address:'6817 27th St W, Tacoma, WA 98466'
    },
    {
        user_name: "Even",
        email:"Even@gmail.com",
        password:"password",
        user_address:'1010 State Ave, Marysville, WA 98270'
    },
    {
        user_name: "Bob",
        email:"Bob@gmail.com",
        password:"password",
        user_address:'900 Jefferson St SE, Olympia, WA 98501'
    },
    {
        user_name: "Jack",
        email:"Jack@gmail.com",
        password:"password",
        user_address:'69010 Bellevue Way NE, Bellevue, WA 98004'
    },
    {
        user_name: "Robin",
        email:"Robin@gmail.com",
        password:"password",
        user_address:'69010 Bellevue Way NE, Bellevue, WA 98004'
    },
]

const seedUserData= () => User.bulkCreate(userData, { individualHooks: true });

module.exports= seedUserData