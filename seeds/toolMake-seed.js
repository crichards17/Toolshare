const ToolMake = require('../models/ToolMake')

const toolMakeData= [
    {
        make_name:"Pimp Tools"
        
    }
]

const seedToolMake=()=>ToolMake.bulkCreate(toolMakeData);
module.exports = seedToolMake;