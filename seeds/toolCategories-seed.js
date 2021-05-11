const ToolCategories= require('../models/ToolCategories')

const toolCategoriesData= [
    {
        categories_name:"Garden/Lawn",
        
    },
    {
        categories_name:"Construction",
    },
    {
        categories_name:"Automobile Tools"
    },
    {
        categories_name:"Electrician"
    },
    {
        categories_name:"Welding"
    }
]

const seedToolModel=()=>ToolCategories.bulkCreate(toolCategoriesData);
module.exports = seedToolModel;