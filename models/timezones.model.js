"use strict";
const { Model, DataTypes } = require("sequelize");
const { TABLES, MODELS } = require("../utils/constant");

module.exports = (sequelize) => {
    class Timezones extends Model {
        static associate(models) {
        }
    }

    Timezones.init(
        {
            id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            offset: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            isActive: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
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
            modelName: MODELS.timezones,
            tableName: TABLES.timezones,
            underscored: true
        }
    );

    return Timezones;
};
