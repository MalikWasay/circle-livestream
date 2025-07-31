const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class Topics extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.community], {
                foreignKey: "communityId",
                as: "community"
            });
            this.hasMany(models[MODELS.spaces_topics], {
                foreignKey: "topicId",
                as: "spacesTopics"
            });
        }
    }

    Topics.init(
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
            communityId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.community,
                    key: "id"
                }
            },
            name: {
                type: DataTypes.STRING,
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
            modelName: MODELS.topics,
            tableName: TABLES.topics,
            underscored: true
        }
    );

    return Topics;
};
