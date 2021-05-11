const ToolCategories= require('../models/ToolCategories')

const toolCategoriesData= [
    {
        categories_name:"Garden",
        
    }
]

const seedToolModel=()=>ToolCategories.bulkCreate(toolCategoriesData);
module.exports = seedToolModel;