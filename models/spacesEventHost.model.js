const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class SpacesEventHost extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces_event], {
                foreignKey: "eventId",
                as: "event"
            });
            this.belongsTo(models[MODELS.space_members], {
                foreignKey: "spaceMemberId",
                as: "spaceMember"
            });

        }
    }

    SpacesEventHost.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            refNo: {
                type: DataTypes.STRING,
                unique: true
            },
            eventId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: MODELS.spaces_event,
                    key: "id"
                }
            },
            spaceMemberId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: MODELS.space_members,
                    key: "id"
                }
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
            modelName: MODELS.spaces_event_host,
            tableName: TABLES.spaces_event_hosts,
            underscored: true
        }
    );

    return SpacesEventHost;
};
