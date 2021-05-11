const Tool = require('../models/Tool')

const toolData= [
    {
        
        tool_categories_id:1,
        tool_name:"Super Hoe 3000 series",
        user_id: 1,
        tool_type_id:1,
        tool_make_id:1
    },
    {
        
        tool_categories_id:2,
        tool_name:"Saw",
        user_id: 2,
        tool_type_id:2,
        tool_make_id:2
    },
    {
        
        tool_categories_id:3,
        tool_name:"Car Jack",
        user_id: 3,
        tool_type_id:3,
        tool_make_id:1
    },
    {
        
        tool_categories_id:4,
        tool_name:"Car Jack",
        user_id: 4,
        tool_type_id:4,
        tool_make_id:3
    },
    {
        
        tool_categories_id:5,
        tool_name:"Plasma Torch",
        user_id: 5,
        tool_type_id:5,
        tool_make_id:3
    }
]

const seedTool=()=>Tool.bulkCreate(toolData);
module.exports = seedTool;