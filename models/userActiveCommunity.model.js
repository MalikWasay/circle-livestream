const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class UserActiveCommunity extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "users"
            });
            this.belongsTo(models[MODELS.community], {
                foreignKey: "communityId",
                as: "community"
            });
            this.belongsTo(models[MODELS.users_subscription], {
                foreignKey: "community_id",
                as: "subscription"
            });
        }
    }

    UserActiveCommunity.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: TABLES.users,
                    key: "id"
                },
                allowNull: false
            },
            communityId: {
                type: DataTypes.INTEGER,
                references: {
                    model: TABLES.community,
                    key: "id"
                },
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
            modelName: MODELS.user_active_community,
            tableName: TABLES.user_active_community,
            underscored: true
        }
    );

    return UserActiveCommunity;
};
