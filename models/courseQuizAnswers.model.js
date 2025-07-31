const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validQuizType } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class CourseQuizAnswers extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.course_quiz], {
                foreignKey: "courseQuizId",
                as: "courseQuiz"
            });
        }
    }

    CourseQuizAnswers.init(
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
            courseQuizId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            option: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isCorrect: {
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
            modelName: MODELS.course_quiz_answers,
            tableName: TABLES.course_quiz_answers,
            underscored: true
        }
    );
    return CourseQuizAnswers;
};
