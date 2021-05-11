const Tool = require('../models/Tool')

const toolData= [
    {
        
        tool_model_id:1,
        tool_name:"Super Hoe 3000 series",
        user_id: 1,
        tool_type_id:1,
        tool_make_id:1
        
    }
]

const seedTool=()=>Tool.bulkCreate(toolData);
module.exports = seedTool;