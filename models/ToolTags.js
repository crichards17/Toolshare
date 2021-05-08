// const { Model, DataTypes} = require('sequelize')
// const sequelize = require('../config/connection')


// class ToolTags extends Model {}

// ToolType.init({
    
//     id:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//       },
//      tool_type_id:{
//        type: DataTypes.INTEGER,
//        allowNull: false,
//        reference:{
//          model:'toolType',
//          key:'id',
      
//        }
//      },
//      tool_id:{
//        type: DataTypes.INTEGER,
//        allowNull: false,
//        reference:{
//          model:'tool'
//        }
//      }

//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'toolTags',
//       }

// )

// module.exports= ToolTags