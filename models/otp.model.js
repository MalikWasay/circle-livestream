const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class Otp extends Model {
        static associate(models) {

        }
    }

    Otp.init(
        {
            refNo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            purpose: {
                type: DataTypes.ENUM("PASSWORD_RESET", "VERIFICATION"),
                allowNull: false
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            expiryTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("PENDING", "VERIFIED", "EXPIRED"),
                allowNull: false
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
            modelName: MODELS.otp,
            tableName: TABLES.otp,
            underscored: true
        }
    );

    return Otp;
};
