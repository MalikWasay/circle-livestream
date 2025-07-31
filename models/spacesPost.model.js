const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class spacesPost extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces], {
                foreignKey: "spaceId",
                as: "spaces"
            });

            this.hasMany(models[MODELS.spaces_media], {
                foreignKey: "entityId",
                as: "spacesMedia"
            });
            this.hasOne(models[MODELS.likes], {
                foreignKey: "entityId",
                as: "likes"

            });
            this.belongsTo(models[MODELS.user], {
                foreignKey: "createdBy",
                as: "user"
            });
            this.hasMany(models[MODELS.comment], {
                foreignKey: "entityId",
                as: "comments"
            });
            this.hasOne(models[MODELS.poll_questions], {
                foreignKey: "entityId",
                as: "pollQuestions"

            });
            this.hasMany(models[MODELS.assign_topics], {
                foreignKey: "entityId",
                as: "assignTopics"
            });
        }
    }

    spacesPost.init(
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
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.users,
                    key: "id"
                }
            },
            spaceGroupId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.spaces_groups,
                    key: "id"
                }
            },
            spaceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.spaces,
                    key: "id"
                }
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true
            },
            likesCount: {
                type: DataTypes.INTEGER
            },
            description: {
                type: DataTypes.TEXT("long"),
                allowNull: true

            },
            permissions: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: {
                    followPost: false,
                    hideLikes: false,
                    hideComments: false,
                    closeComments: false

                }
            },
            pinned: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
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
            modelName: MODELS.spaces_posts,
            tableName: TABLES.spaces_posts,
            underscored: true
        }
    );

    return spacesPost;
};
