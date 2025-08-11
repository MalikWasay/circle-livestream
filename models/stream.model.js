const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
module.exports = (sequelize) => {
  class Stream extends Model {
    static associate(models) {
      this.belongsTo(models[MODELS.user], {
        foreignKey: "user_id",
        as: "user",
      });
      
    }
  }

  Stream.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ref_no: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stream_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "live", "ended"),
        defaultValue: "pending",
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: TABLES.users,
          key: "id",
        },
      },
      playback_url: {
        type: DataTypes.STRING,
        allowNull: false
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
      modelName: MODELS.stream,
      tableName: TABLES.streams,
      underscored: true
    }
  );

  return Stream;
};
