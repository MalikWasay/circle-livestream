"use strict";
const { Model, DataTypes } = require("sequelize");
const { TABLES, MODELS } = require("../utils/constant");

module.exports = (sequelize) => {
    class Token extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
        }
    }

    Token.init(
        {
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            token: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            refreshToken: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
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
            modelName: MODELS.token,
            tableName: TABLES.tokens,
            underscored: true
        }
    );

    return Token;
};
