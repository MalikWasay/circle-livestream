const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validEntityType } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class Comment extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.user], {
                foreignKey: "userId",
                as: "user"
            });

            this.hasMany(models[MODELS.comment], {
                foreignKey: "parentCommentId",
                as: "replies"
            });

            this.belongsTo(models[MODELS.comment], {
                foreignKey: "parentCommentId",
                as: "parent"
            });

            this.hasMany(models[MODELS.likes], {
                foreignKey: "entityId",
                as: "likes"
            });
        }
    }

    Comment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            refNo: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "user_id"
            },
            entityId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            entityType: {
                type: DataTypes.ENUM(...validEntityType),
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            parentCommentId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            likesCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            isEdited: {
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
            modelName: MODELS.comment,
            tableName: TABLES.comment,
            underscored: true
        }
    );

    return Comment;
};
