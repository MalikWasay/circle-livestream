const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validQuizType } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class CourseQuiz extends Model {
        static associate(models) {
            this.hasMany(models[MODELS.course_quiz_answers], {
                foreignKey: "courseQuizId",
                as: "courseQuizAnswers"
            });
            this.belongsTo(models[MODELS.spaces_courses_lessons], {
                foreignKey: "spacesCoursesLessonsId",
                as: "lesson"
            });
        }
    }

    CourseQuiz.init(
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
            spacesCoursesLessonsId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TABLES.spaces_courses_lessons,
                    key: "id"
                }
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM(...validQuizType),
                allowNull: false
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true
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
            modelName: MODELS.course_quiz,
            tableName: TABLES.course_quiz,
            underscored: true
        }
    );
    return CourseQuiz;
};
