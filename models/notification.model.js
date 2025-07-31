const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validNotificationEntityType, validNotificationType, validNotificationStatus } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class Notification extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
            this.belongsTo(models[MODELS.user], {
                foreignKey: "fromUserId",
                as: "fromUser"
            });
        }
    }

    Notification.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: MODELS.user,
                    key: "id"
                }
            },
            fromUserId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: MODELS.user,
                    key: "id"
                }
            },
            entityId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            entityType: {
                type: DataTypes.ENUM(...validNotificationEntityType),
                allowNull: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM(...validNotificationStatus),
                allowNull: false,
                defaultValue: "PENDING"
            },
            read: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            metadata: {
                type: DataTypes.JSON,
                allowNull: true
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
            modelName: MODELS.notification,
            tableName: TABLES.notification,
            underscored: true
        }
    );
    return Notification;
};
