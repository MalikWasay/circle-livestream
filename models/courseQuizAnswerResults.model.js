const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class CourseQuizResultAnswers extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.course_quiz_results], {
                foreignKey: "resultId",
                as: "result"
            });

            this.belongsTo(models[MODELS.course_quiz], {
                foreignKey: "quizId",
                as: "quiz"
            });

            this.belongsTo(models[MODELS.course_quiz_answers], {
                foreignKey: "selectedAnswerId",
                as: "selectedAnswer"
            });

            this.belongsTo(models[MODELS.course_quiz_answers], {
                foreignKey: "correctAnswerId",
                as: "correctAnswer"
            });
        }
    }

    CourseQuizResultAnswers.init(
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
            resultId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.course_quiz_results,
                    key: "id"
                }
            },
            quizId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.course_quiz,
                    key: "id"
                }
            },
            selectedAnswerId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            correctAnswerId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            isCorrect: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
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
            modelName: MODELS.course_quiz_answer_results,
            tableName: TABLES.course_quiz_answer_results,
            underscored: true
        }
    );

    return CourseQuizResultAnswers;
};
