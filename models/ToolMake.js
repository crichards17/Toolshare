const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class ToolMake extends Model{}

ToolMake.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        make_name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'toolMake',
      }
)

module.exports= ToolMake