const Tool = require('../models/Tool')

const toolData= [
    {
        tool_model_id:1,
        tool_name:"Hoe",
        user_id: 1,
        
    }
]

const seedTool=()=>Tool.bulkCreate(toolData);
module.exports = seedTool;