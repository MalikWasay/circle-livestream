const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
module.exports = (sequelize) => {
    class WorkflowActionMapping extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.workflows], {
                foreignKey: "entityId",
                as: "workflows"
            });
            this.belongsTo(models[MODELS.workflow_actions], {
                foreignKey: "actionId",
                as: "actions"
            });
        }
    }

    WorkflowActionMapping.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            entityId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            entityType: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "WORKFLOW"
            },
            actionId: {
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
            modelName: MODELS.workflow_action_mapping,
            tableName: TABLES.workflow_action_mapping,
            underscored: true
        }
    );

    return WorkflowActionMapping;
};
