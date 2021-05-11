const ToolType = require('../models/ToolType')

const toolTypeData= [
    {
        tool_types_name: "Hoe"
        
    },
    {
        tool_types_name: "Saw"
    },
    {
        tool_types_name: "Car Jack"
    },
    {
        tool_types_name: "Voltage Tester"
    },
    {
        tool_types_name: "Plasma Cutter"
    }
]

const seedToolType=()=>ToolType.bulkCreate(toolTypeData);
module.exports = seedToolType;