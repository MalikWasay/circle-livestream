const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class Settings extends Model {
        static associate(models) {

        }
    }

    Settings.init(
        {
            buildNumberIos: {
                type: DataTypes.STRING,
                allowNull: false
            },
            buildNumberAndroid: {
                type: DataTypes.STRING,
                allowNull: false
            },
            maintenanceMode: {
                type: DataTypes.TINYINT,
                allowNull: false
            },
            freeTrialDays: {
                type: DataTypes.INTEGER,
                defaultValue: 14,
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
            modelName: MODELS.settings,
            tableName: TABLES.settings,
            underscored: true
        }
    );

    return Settings;
};
