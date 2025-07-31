const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validQuizType } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class CourseQuizResults extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
            this.belongsTo(models[MODELS.spaces_courses_lessons], {
                foreignKey: "lessonId",
                as: "lesson"
            });
            this.hasMany(models[MODELS.course_quiz_answer_results],{
                foreignKey: "resultId",
                as: "courseQuizAnswerResults"
            });
        }
    }

    CourseQuizResults.init(
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
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.users,
                    key: "id"
                }
            },
            lessonId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.spaces_courses_lessons,
                    key: "id"
                }
            },

            totalQuestions: {
                type: DataTypes.INTEGER
            },
            correctAnswers: {
                type: DataTypes.INTEGER
            },
            scorePercent: {
                type: DataTypes.INTEGER
            },
            status: {
                type: DataTypes.ENUM("PASSED", "FAILED")
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
            modelName: MODELS.course_quiz_results,
            tableName: TABLES.course_quiz_results,
            underscored: true
        }
    );
    return CourseQuizResults;
};
