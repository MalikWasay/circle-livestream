const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class SpacesGroups extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
            this.belongsTo(models[MODELS.community], {
                foreignKey: "communityId",
                as: "community"
            });
            this.hasMany(models[MODELS.spaces], {
                foreignKey: "spaceGroupsId",
                as: "spaces"
            });
        }
    }

    SpacesGroups.init(
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
            isActive: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                allowNull: false
            },
            permission: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: {
                    hideMemberCount: false,
                    hideFromNonSpaceMembers: false,
                    showJoinedSpaceSidebar: false,
                    allowMembersToCreateSpace: false
                }
            },
            slug: {
                type: DataTypes.STRING,
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
            modelName: MODELS.spaces_groups,
            tableName: TABLES.spaces_groups,
            underscored: true
        }
    );

    return SpacesGroups;
};
