const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

const { validSubscriptionType, validBillingInterval } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class Subscription extends Model {
    }

    Subscription.init(
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
            subscriptionType: {
                type: DataTypes.ENUM(...validSubscriptionType),
                allowNull: false
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            billingInterval: {
                type: DataTypes.ENUM(...validBillingInterval),
                allowNull: true
            },
            isCustom: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            numberOfIntervals: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            isFreeTrial: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            features: {
                type: DataTypes.JSON,
                allowNull: true
            },
            comparePlans: {
                type: DataTypes.JSON,
                allowNull: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
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
            modelName: MODELS.subscription,
            tableName: TABLES.subscription,
            underscored: true
        }
    );

    return Subscription;
};
