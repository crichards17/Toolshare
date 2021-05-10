const sequelize = require('../config/connection');


const userData = require('./user-seed');
const toolData= require('./tool-seed');
const toolModelData= require('./toolModel-seed')

const seedDatabase = async ()=>{
    await sequelize.sync({force: true});
    await userData();
    await toolModelData();
    await toolData();
}

seedDatabase()