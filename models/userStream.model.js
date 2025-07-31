const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
module.exports = (sequelize) => {
  class UserStream extends Model {
    static associate(models) {
      this.belongsTo(models[MODELS.user], {
        foreignKey: "userId",
        as: "user",
      });
      this.belongsTo(models[MODELS.stream],{
        foreignKey: "streamId",
        as: "stream"
      })
    }
  }

  UserStream.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      refNo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: TABLES.users,
          key: "id",
        },
      },
      streamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: TABLES.streams,
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: MODELS.user_stream,
      tableName: TABLES.user_streams,
    }
  );

  return UserStream;
};
