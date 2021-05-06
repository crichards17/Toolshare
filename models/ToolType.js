const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class ToolType extends Model {}

ToolType.init({
    
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tool_types_name:{
          type: DataTypes.STRING,
      }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'toolType',
      }

)

module.exports= ToolType