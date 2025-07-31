const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class SpacesOptions extends Model {
        static associate(models) {

        }
    }

    SpacesOptions.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
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
            modelName: MODELS.spaces_options,
            tableName: TABLES.spaces_options,
            underscored: true
        }
    );

    return SpacesOptions;
};
