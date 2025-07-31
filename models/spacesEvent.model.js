const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class SpacesEvent extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces], {
                foreignKey: "spaceId",
                as: "spaces"
            });
            this.hasMany(models[MODELS.spaces_event_host], {
                foreignKey: "eventId",
                as: "hosts"
            });
            this.hasMany(models[MODELS.likes], {
                foreignKey: "entityId",
                as: "likes"
            });
            this.hasMany(models[MODELS.comment], {
                foreignKey: "entityId",
                as: "comments"
            });
            this.hasMany(models[MODELS.event_attendees], {
                foreignKey: "spacesEventId",
                as: "eventAttendees"
            });
            this.hasMany(models[MODELS.assign_topics], {
                foreignKey: "entityId",
                as: "assignTopics"
            });
        }
    }

    SpacesEvent.init(
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
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false
            },
            spaceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: MODELS.spaces,
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
            eventStartDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            eventEndDate: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            eventStartTime: {
                type: DataTypes.TIME,
                allowNull: true
            },
            eventEndTime: {
                type: DataTypes.TIME,
                allowNull: true
            },
            repeatType: {
                type: DataTypes.ENUM("DOESNOT_REPEAT", "DAILY", "EVERY_WEEKDAY", "EVERY_THURSDAY", "BI_WEEKLY_ON_THURSDAY"),
                defaultValue: "DOESNOT_REPEAT",
                allowNull: false
            },
            location: {
                type: DataTypes.ENUM("IN_PERSON", "URL", "LIVE_STREAM", "LIVE_ROOM", "TBD"),
                allowNull: false,
                defaultValue: "IN_PERSON"
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true
            },
            url: {
                type: DataTypes.STRING,
                allowNull: true
            },
            hideLocationFromNonAttendees: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            isRecord: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            autoPostRecording: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            muteParticipants: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            hideParticipants: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            disableLiveLink: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            isPaid: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            coverImage: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.TEXT
            },
            notification: {
                type: DataTypes.JSON,
                defaultValue: {
                    sendEmailNotification: true,
                    sendConfirmationEmail: true,
                    sendInAppNotification: true,
                    thankYouMessage: ""
                }
            },
            seo: {
                type: DataTypes.JSON,
                defaultValue: {
                    title: null,
                    description: null
                }
            },
            openGraph: {
                type: DataTypes.JSON,
                defaultValue: {
                    title: null,
                    description: null,
                    image: null
                }
            },
            reminder: {
                type: DataTypes.JSON,
                defaultValue: {
                    reminderHourBefore: true,
                    emailReminder: true
                }
            },
            permissions: {
                type: DataTypes.JSON,
                defaultValue: {
                    hideMetaInfo: false,
                    closeComments: false,
                    closeLikes: false,
                    hideFromFeatureArea: false
                }
            },
            attendees: {
                type: DataTypes.JSON,
                defaultValue: {
                    disableRSPV: false,
                    hideAttendees: false,
                    limitRSVP: false,
                    maxRSVP: 0
                }
            },
            status: {
                type: DataTypes.ENUM("DRAFT", "PENDING", "ONGOING", "POSTPONED", "COMPLETED", "CANCELLED", "PUBLISHED"),
                defaultValue: "DRAFT"
            },
            likesCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0
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
            modelName: MODELS.spaces_event,
            tableName: TABLES.spaces_events,
            underscored: true
        }
    );

    return SpacesEvent;
};
