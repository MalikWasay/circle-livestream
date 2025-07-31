const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class UserCourse extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
            this.belongsTo(models[MODELS.spaces_courses], {
                foreignKey: "courseId",
                as: "course"
            });
        }
    }

    UserCourse.init(
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
            courseId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TABLES.spaces_courses,
                    key: "id"
                }
            },
            status: {
                type: DataTypes.ENUM("COMPLETED", "IN_PROGRESS", "PENDING"),
                defaultValue: "PENDING",
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
            modelName: MODELS.user_course,
            tableName: TABLES.user_course,
            underscored: true
        }
    );

    return UserCourse;
};
