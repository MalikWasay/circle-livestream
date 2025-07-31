const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validSpacesImagePostStatus } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class spacesImagePost extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces], {
                foreignKey: "spaceId",
                as: "spaces"
            });
            this.belongsTo(models[MODELS.user], {
                foreignKey: "createdBy",
                as: "users"
            });
            this.hasMany(models[MODELS.spaces_media], {
                foreignKey: "entityId",
                as: "spacesMedia"
            });
            this.hasMany(models[MODELS.likes], {
                foreignKey: "entityId",
                as: "likes"
            });
            this.hasMany(models[MODELS.comment], {
                foreignKey: "entityId",
                as: "comments"
            });
            this.hasMany(models[MODELS.assign_topics], {
                foreignKey: "entityId",
                as: "assignTopics"
            });
        }
    }

    spacesImagePost.init(
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
            spaceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.spaces,
                    key: "id"
                }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            permissions: {
                type: DataTypes.JSON,
                defaultValue: {
                    hideMetaInfo: false,
                    hideComments: false,
                    closeComments: false,
                    hideLikes: false,
                    disableTruncation: false,
                    hideFromFeaturedAreas: false,
                    makeImagesDownloadable: false
                }
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: true
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: TABLES.users,
                    as: "id"
                }
            },
            status: {
                type: DataTypes.ENUM(...validSpacesImagePostStatus),
                defaultValue: "PUBLISH",
                allowNull: false
            },
            likesCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            schedule: {
                type: DataTypes.DATE,
                allowNull: true
            },
            urlSlug: {
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
            modelName: MODELS.spaces_image_post,
            tableName: TABLES.spaces_image_post,
            underscored: true
        }
    );
    return spacesImagePost;
};
