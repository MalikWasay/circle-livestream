const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validWorkflowTriggerType, validWorkflowTriggerNames } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class workflowTriggers extends Model {

    }

    workflowTriggers.init(
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
            triggerName: {
                type: DataTypes.ENUM(...validWorkflowTriggerNames),
                allowNull: true
            },
            triggerType: {
                type: DataTypes.ENUM(...validWorkflowTriggerType),
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
            modelName: MODELS.workflow_triggers,
            tableName: TABLES.workflow_triggers,
            underscored: true
        }
    );
    return workflowTriggers;
};
