const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const User = require('./User')

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
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'user',
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

module.exports=Tool