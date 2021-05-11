const ToolMake = require('../models/ToolMake')

const toolMakeData= [
    {
        make_name:"Pimp Tools"
        
    },
    {
        make_name:"Cool Tools"
    },
    {
        make_name:"Super Tools"
    }
]

const seedToolMake=()=>ToolMake.bulkCreate(toolMakeData);
module.exports = seedToolMake;