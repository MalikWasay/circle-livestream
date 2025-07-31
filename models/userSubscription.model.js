const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class UsersSubscription extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
            this.belongsTo(models[MODELS.community], {
                foreignKey: "communityId",
                as: "community"
            });
            this.belongsTo(models[MODELS.subscription], {
                foreignKey: "subscriptionId",
                as: "subscription"
            });
        }
    }

    UsersSubscription.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TABLES.users,
                    key: "id"
                }
            },
            communityId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TABLES.community,
                    key: "id"
                }
            },
            subscriptionId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TABLES.subscription,
                    key: "id"
                }
            },
            subscriptionStartDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            subscriptionEndDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            validSubscription: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
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
            modelName: MODELS.users_subscription,
            tableName: TABLES.users_subscription,
            underscored: true
        }
    );

    return UsersSubscription;
};
