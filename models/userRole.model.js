const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class UserRole extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.role], {
                foreignKey: "roleId",
                as: "roles"
            });
        }
    }

    UserRole.init(
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
            roleId: {
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
            modelName: MODELS.user_role,
            tableName: TABLES.user_roles,
            underscored: true
        }
    );

    return UserRole;
};
