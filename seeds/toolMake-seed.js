const ToolMake = require('../models/ToolMake')

const toolMakeData= [
    //MySQL Database, starts at 1 NOT 0
    {
        make_name:"Pimp Tools"
        //1
        
    },
    {
        make_name:"Cool Tools"
        //2
    },
    {
        make_name:"Super Tools"
        //3
    },
    {
        make_name:"Michigain State is Trash"
        //4
    },
]

const seedToolMake=()=>ToolMake.bulkCreate(toolMakeData);
module.exports = seedToolMake;