const ToolType = require('../models/ToolType')

const toolTypeData= [
    {
        tool_types_name: "Hoe"
        
    }
]

const seedToolType=()=>ToolType.bulkCreate(toolTypeData);
module.exports = seedToolType;