const ToolModel = require('../models/ToolModel')

const toolModelData= [
    {
        model_name:"Garden",
        
    }
]

const seedToolModel=()=>ToolModel.bulkCreate(toolModelData);
module.exports = seedToolModel;