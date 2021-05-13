const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class ToolCategories extends Model{}

ToolCategories.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        categories_name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'toolCategories',
      }
)

module.exports= ToolCategories