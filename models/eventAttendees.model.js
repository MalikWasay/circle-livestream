"use strict";
const { Model, DataTypes } = require("sequelize");
const { TABLES, MODELS } = require("../utils/constant");
const { validEventAttendeesStatus } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class EventAttendees extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces_event], {
                foreignKey: "spacesEventId",
                as: "spacesEvent"
            });

            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
        }
    }

    EventAttendees.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            spacesEventId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.spaces_events,
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.users,
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            status: {
                type: DataTypes.ENUM(...validEventAttendeesStatus),
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
            modelName: MODELS.event_attendees,
            tableName: TABLES.event_attendees,
            underscored: true
        }
    );

    return EventAttendees;
};
