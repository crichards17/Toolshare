const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const User = require('./User')
const ToolModel= require('./ToolModel')
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
        // tool_model_id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references:{
        //         model:'toolModel',
        //         key:'id',
        //         unique:false
        //     } 
        // },
        // tool_type_id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references:{
        //         model:'toolType',
        //         key:'id',
        //         unique:false
        //     } 
        // },
        // tool_make_id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references:{
        //         model:'toolMake',
        //         key:'id',
        //         unique:false
        //     } 
        // }
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