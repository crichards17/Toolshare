const sequelize = require('../config/connection');


const userData = require('./user-seed')
const toolData= require('./tool-seed')

const seedDatabase = async ()=>{
    await sequelize.sync({force: true});
    await userData();
    await toolData();
    
}

seedDatabase()