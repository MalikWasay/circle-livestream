const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
module.exports = (sequelize) => {
    class SpacesTopics extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.topics], {
                foreignKey: "topicId",
                as: "topic"
            });
            this.hasMany(models[MODELS.assign_topics], {
                foreignKey: "spaceTopicId",
                as: "assignTopics"
            });
        }
    }

    SpacesTopics.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            refNo: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            spaceId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            topicId: {
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
            modelName: MODELS.spaces_topics,
            tableName: TABLES.spaces_topics,
            underscored: true,
            defaultScope: {
                attributes: {
                    exclude: []
                }
            }
        }
    );

    return SpacesTopics;
};
