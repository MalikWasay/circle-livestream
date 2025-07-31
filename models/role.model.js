const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class Role extends Model {
        static associate(models) {

        }
    }

    Role.init(
        {
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
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
            modelName: MODELS.role,
            tableName: TABLES.roles,
            underscored: true
        }
    );

    return Role;
};
