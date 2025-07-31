const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class LikesModel extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });

            this.belongsTo(models[MODELS.comment], {
                foreignKey: "entityId",
                as: "entity"
            });
        }
    }

    LikesModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            entityId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            entityType: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: MODELS.likes,
            tableName: TABLES.likes,
            underscored: true
        }
    );

    return LikesModel;
};
