const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validChatMessageType } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class ChatMessages extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });

            this.belongsTo(models[MODELS.spaces], {
                foreignKey: "spaceId",
                as: "space"
            });
            this.hasMany(models[MODELS.spaces_media], {
                foreignKey: "entityId",
                as: "mediaUrls"
            });

        }
    }

    ChatMessages.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            refNo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: MODELS.user,
                    key: "id"
                }
            },
            spaceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: MODELS.spaces,
                    key: "id"
                }
            },

            content: {
                type: DataTypes.TEXT,
                allowNull: true
            },

            isEdited: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
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
            modelName: MODELS.chat_message,
            tableName: TABLES.chat_messages,
            underscored: true
        }
    );

    return ChatMessages;
};
