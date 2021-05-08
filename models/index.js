const User = require('./User');
const Tool = require('./Tool');
const ToolType= require('./ToolType');
// const ToolTags= require('./ToolTags')
const ToolModel= require('./ToolModel')
const ToolMake = require('./ToolMake')

User.hasMany(Tool,{
    foreignKey:'user_id',
    onDelete:'Cascade'
});

Tool.belongsTo(User,{
    foreignKey:'user_id'
});
// ToolType.hasMany(Tool,{
//     foreignKey:' tool_type_id'
// })

// ToolModel.hasMany(Tool,{
//     foreignKey:'tool_model_id'
// })

// ToolMake.hasMany(Tool,{
//     foreignKey:'tool_make_id'
// })

// Tool.belongsTo(ToolModel,{
//     foreignKey:'tool_model_id'
// });

// Tool.belongsTo(ToolType,{
//     foreignKey:' tool_type_id'
// })

// Tool.belongsTo(ToolMake,{
//     foreignKey:'tool_make_id'
// })

module.exports = {User, Tool}
