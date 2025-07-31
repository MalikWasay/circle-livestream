const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");
const { validCommunityMemberStatus } = require("../config/generalConfig");
module.exports = (sequelize) => {
    class CommunityMember extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.community], {
                foreignKey: "communityId",
                as: "community"
            });
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
            this.belongsTo(models[MODELS.role], {
                foreignKey: "roleId",
                as: "role"
            });
            this.belongsTo(models[MODELS.user], {
                foreignKey: "addedBy",
                as: "addedByUser"
            });

        }
    }

    CommunityMember.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            refNo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: MODELS.user,
                    key: "id"
                }
            },
            addedBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: MODELS.user,
                    key: "id"
                }
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userEmail: {
                type: DataTypes.STRING,
                allowNull: false
            },
            communityId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: MODELS.community,
                    key: "id"
                }
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: MODELS.role,
                    key: "id"
                }
            },
            status: {
                type: DataTypes.ENUM(...validCommunityMemberStatus),
                allowNull: false,
                defaultValue: "PENDING"
            },
            joinDate: {
                type: DataTypes.DATE
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: MODELS.community_members,
            tableName: TABLES.community_members,
            underscored: true
        }
    );

    return CommunityMember;
};
