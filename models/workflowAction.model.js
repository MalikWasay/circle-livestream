const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validWorkflowActionType, validWorkflowActionName } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class workflowActions extends Model {
        static associate(models) {
            this.hasMany(models[MODELS.workflow_action_mapping], {
                foreignKey: "entityId",
                as: "workflowActionMapping"
            });
        }
    }

    workflowActions.init(
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
            actionName: {
                type: DataTypes.ENUM(...validWorkflowActionName),
                allowNull: true
            },
            actionType: {
                type: DataTypes.ENUM(...validWorkflowActionType),
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
            modelName: MODELS.workflow_actions,
            tableName: TABLES.workflow_actions,
            underscored: true
        }
    );
    return workflowActions;
};
