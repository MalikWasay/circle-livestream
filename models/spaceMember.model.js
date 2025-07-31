const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");
const { validSpaceMemberStatus } = require("../config/generalConfig");
module.exports = (sequelize) => {
    class SpaceMember extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces], {
                foreignKey: "spaceId",
                as: "spaces"
            });
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
            this.belongsTo(models[MODELS.role], {
                foreignKey: "roleId",
                as: "role"
            });
        }
    }

    SpaceMember.init(
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
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userEmail: {
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
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: MODELS.role,
                    key: "id"
                }
            },
            status: {
                type: DataTypes.ENUM(...validSpaceMemberStatus),
                allowNull: false,
                defaultValue: "PENDING"
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
            modelName: MODELS.space_members,
            tableName: TABLES.space_members,
            underscored: true
        }
    );

    return SpaceMember;
};
