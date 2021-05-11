const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const User = require('./User')
const ToolCategories= require('./ToolCategories')
const ToolMake= require('./ToolMake')
const ToolType= require('./ToolType')

class Tool extends Model{}

Tool.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tool_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tool_description:{
            type: DataTypes.STRING  
        },
        asking: {
            type: DataTypes.STRING,
        },
        
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'user',
                key:'id',
                // unique:false
            }
        },
        
        tool_categories_id:{
            type: DataTypes.INTEGER,
                references:{
                model:'toolModel',
                key:'id',
                
            } 
        },
        tool_type_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'toolType',
                key:'id',
                
            } 
        },
        tool_make_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'toolMake',
                key:'id',
                unique:false
            } 
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'tool',
      }
)

module.exports= Tool