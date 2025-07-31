const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");
const {
    validSpaceType,
    validSpaceAccess
} = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class Spaces extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
            this.belongsTo(models[MODELS.community], {
                foreignKey: "communityId",
                as: "community"
            });
            this.belongsTo(models[MODELS.spaces_groups], {
                foreignKey: "spaceGroupsId",
                as: "spaceGroups"
            });
            this.hasMany(models[MODELS.spaces_media], {
                foreignKey: "entityId",
                as: "spacesMedia"
            });
            this.hasMany(models[MODELS.space_members], {
                foreignKey: "spaceId",
                as: "spaceMembers"
            });
            this.hasMany(models[MODELS.spaces_topics], {
                foreignKey: "spaceId",
                as: "spacesTopics"
            });

        }
    }
    24;
    Spaces.init(
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
            userId: {
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
            spaceGroupsId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.spaces_groups,
                    key: "id"
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hideFromSidebar: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true
            },
            type: {
                type: DataTypes.ENUM(...validSpaceType),
                allowNull: false
            },
            access: {
                type: DataTypes.ENUM(...validSpaceAccess),
                allowNull: true
            },

            notification: {
                type: DataTypes.JSON,
                allowNull: true
            },
            permissions: {
                type: DataTypes.JSON,
                allowNull: false
            },
            seo: {
                type: DataTypes.JSON,
                allowNull: false
            },
            eventAutoRsvp: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true
            },
            displayNextEvent: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true
            },
            layout: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: {

                    SpaceLayout: "Feed",
                    rightSidebar: false,
                    memberBlock: false

                }
            },
            memberSelectTopic: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true
            },
            coverImage: {
                type: DataTypes.STRING,
                allowNull: true
            },
            mobileThumbnail: {
                type: DataTypes.STRING,
                allowNull: true
            },
            isActive: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                allowNull: true
            },
            paywall: {
                type: DataTypes.JSON,
                allowNull: true
            },
            description: {
                type: DataTypes.TEXT,
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
            modelName: MODELS.spaces,
            tableName: TABLES.spaces,
            underscored: true
        }
    );

    return Spaces;
};
