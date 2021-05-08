const User = require('./User');
const Tool = require('./Tool');
const ToolType= require('./ToolType');
const ToolTags= require('./ToolTags')

User.hasMany(Tool,{
    foreignKey:'user_id',
    onDelete:'Cascade'
});

Tool.belongsTo(User,{
    foreignKey:'user_id'
});

ToolType.belongsToMany(Tool,{
    through:{
        model:ToolTags
    }
})

Tool.belongsTo(ToolType,{
    through:{
        model:ToolTags
    }
})