const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class UserCourseLesson extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user_course], {
                foreignKey: "userCourseId",
                as: "userCourse"
            });
            this.belongsTo(models[MODELS.spaces_courses_lessons], {
                foreignKey: "spacesCoursesLessonsId",
                as: "spacesCoursesLessons"
            });
        }
    }

    UserCourseLesson.init(
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
            userCourseId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TABLES.user_course,
                    key: "id"
                }
            },
            spacesCoursesLessonsId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TABLES.spaces_courses_lessons,
                    key: "id"
                }
            },
            status: {
                type: DataTypes.ENUM("COMPLETED", "IN_PROGRESS", "PENDING"),
                defaultValue: "COMPLETED",
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
            modelName: MODELS.user_course_lesson,
            tableName: TABLES.user_course_lesson,
            underscored: true
        }
    );

    return UserCourseLesson;
};
