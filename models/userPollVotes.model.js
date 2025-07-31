const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class userPollVotes extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });
            this.belongsTo(models[MODELS.poll_questions], {
                foreignKey: "pollQuestionId",
                as: "pollQuestion"
            });
            this.belongsTo(models[MODELS.poll_options], {
                foreignKey: "pollOptionId",
                as: "pollOption"
            });
        }
    }

    userPollVotes.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            pollQuestionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            pollOptionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "poll_option_id"
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
            modelName: MODELS.user_poll_votes,
            tableName: TABLES.user_poll_votes,
            underscored: true
        }
    );

    return userPollVotes;
};
