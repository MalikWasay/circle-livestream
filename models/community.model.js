const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class Community extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "users"
            });
            this.hasMany(models[MODELS.community_members], {
                foreignKey: "communityId",
                as: "communityMembers"
            });
            this.hasOne(models[MODELS.users_subscription], {
                foreignKey: "communityId",
                as: "usersSubscription"
            });
        }
    }

    Community.init(
        {
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false
            },
            annualRevenue: {
                type: DataTypes.STRING,
                allowNull: true
            },
            usage: {
                type: DataTypes.JSON,
                allowNull: true
            },
            essentials: {
                type: DataTypes.JSON,
                allowNull: true
            },
            howDidYouHear: {
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM(
                    "PENDING_INFO",
                    "PENDING_ESSENTIALS",
                    "COMPLETED"
                ),
                defaultValue: "PENDING_INFO"

            },
            color: {
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
            modelName: MODELS.community,
            tableName: TABLES.community,
            underscored: true
        }
    );

    return Community;
};
