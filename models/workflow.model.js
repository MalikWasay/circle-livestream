const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validWorkflowType } = require("../config/generalConfig.json");

module.exports = (sequelize) => {
    class workflows extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.workflow_triggers], {
                foreignKey: "triggerId",
                as: "trigger"
            });
            this.hasMany(models[MODELS.workflow_action_mapping], {
                foreignKey: "entityId",
                as: "workflowActionMapping"
            });
            this.belongsTo(models[MODELS.user], {
                foreignKey: "createdBy",
                as: "user"
            });
            this.belongsTo(models[MODELS.community],{
                foreignKey: "communityId",
                as: "community"
            });
        }
    }

    workflows.init(
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
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM(...validWorkflowType),
                allowNull: false,
                defaultValue: "AUTOMATION"
            },
            scheduleAt: {
                type: DataTypes.DATE,
                allowNull: true
            },
            triggerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.workflow_triggers,
                    key: "id"
                }
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.users,
                    key: "id"
                }
            },
            communityId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.community,
                    key: "id"
                }
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
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
            modelName: MODELS.workflows,
            tableName: TABLES.workflows,
            underscored: true
        }
    );
    return workflows;
};
