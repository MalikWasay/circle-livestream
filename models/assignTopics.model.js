const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class AssignTopics extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces_topics], {
                foreignKey: "spaceTopicId",
                as: "spacesTopics"
            });
        }
    }

    AssignTopics.init(
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
            spaceTopicId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            entityId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            entityType: {
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
            modelName: MODELS.assign_topics,
            tableName: TABLES.assign_topics,
            underscored: true
        }
    );

    return AssignTopics;
};
