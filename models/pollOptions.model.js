const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class PollOptions extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.poll_questions], {
                foreignKey: "pollQuestionId",
                as: "pollQuestions"
            });
        }
    }

    PollOptions.init(
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
            pollQuestionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.poll_questions,
                    key: "id"
                }
            },
            option: {
                type: DataTypes.STRING,
                allowNull: false
            },
            voteCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
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
            modelName: MODELS.poll_options,
            tableName: TABLES.poll_options,
            underscored: true
        }
    );

    return PollOptions;
};
