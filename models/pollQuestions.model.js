const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class PollQuestions extends Model {
        static associate(models) {
            this.hasMany(models[MODELS.poll_options], {
                foreignKey: "pollQuestionId",
                as: "pollOptions"
            });
        }
    }

    PollQuestions.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            refNo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            question: {
                type: DataTypes.STRING
            },
            entityId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            entityType: {
                type: DataTypes.ENUM("POST"),
                allowNull: false,
                defaultValue: "POST"
            },
            allowViewResult: {
                type: DataTypes.BOOLEAN
            },
            endDate: {
                type: DataTypes.DATE
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
            modelName: MODELS.poll_questions,
            tableName: TABLES.poll_questions,
            underscored: true
        }
    );

    return PollQuestions;
};
