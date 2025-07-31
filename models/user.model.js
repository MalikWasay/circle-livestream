const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");
const { validUserStatus } = require("../config/generalConfig");
module.exports = (sequelize) => {
    class User extends Model {
        async hashPassword() {
            if (this.changed("password")) {
                const hashedPassword = await bcrypt.hash(this.password, 10);
                this.password = hashedPassword;
            }
        }

        static associate(models) {
            this.hasMany(models[MODELS.community], {
                foreignKey: "userId",
                as: "communities"
            });
            this.hasMany(models[MODELS.stream],{
                foreignKey: "user_id",
                as: "stream"
            });
            this.hasOne(models[MODELS.user_active_community], {
                foreignKey: "userId",
                as: "userActiveCommunity"
            });
            this.hasMany(models[MODELS.community_members], {
                foreignKey: "userId",
                as: "communityMembers"
            });
        }
    }

    User.init(
        {

            name: {
                type: DataTypes.STRING
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.ENUM(...validUserStatus),
                defaultValue: "PENDING_VERIFICATION"
            },
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            lastLoginAt: {
                type: DataTypes.DATE,
                allowNull: true
            },
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true
            },
            color: {
                type: DataTypes.STRING,
                allowNull: true
            },
            headling: {
                type: DataTypes.STRING,
                allowNull: true
            },
            bio: {
                type: DataTypes.STRING,
                allowNull: true
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true
            },
            timezoneId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            socialUrls: {
                type: DataTypes.JSON,
                allowNull: true
            },
            permissions: {
                type: DataTypes.JSON,
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
            modelName: MODELS.user,
            tableName: TABLES.users,
            underscored: true,
            hooks: {
                beforeCreate: async (user) => {
                    await user.hashPassword();
                }
            },
            defaultScope: {
                attributes: {
                    exclude: []
                }
            }
        }
    );

    return User;
};
