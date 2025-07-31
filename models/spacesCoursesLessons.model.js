const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validLessonsStatus, validLessonsType, validLessonsDefaultTab } = require("../config/generalConfig.json");

module.exports = (sequelize) => {
    class spacesCoursesLessons extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces_courses_sections], {
                foreignKey: "sectionId",
                as: "section"
            });
            this.hasMany(models[MODELS.spaces_media], {
                foreignKey: "entityId",
                as: "spacesMedia"
            });
            this.hasMany(models[MODELS.course_quiz], {
                foreignKey: "spacesCoursesLessonsId",
                as: "courseQuiz"
            });
        }
    }

    spacesCoursesLessons.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM(...validLessonsStatus),
                defaultValue: "DRAFT",
                allowNull: true
            },
            type: {
                type: DataTypes.ENUM(...validLessonsType),
                allowNull: false
            },
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            sectionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.spaces_courses_sections,
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
                    enableFeatureMedia: false,
                    closeComments: false,
                    enforceVideoCompletion: false,
                    autoAdvanceAfterVideo: false
                }
            },
            defaultTab: {
                type: DataTypes.ENUM(...validLessonsDefaultTab),
                defaultValue: "Curriculum",
                allowNull: true
            },
            embedUrl: {
                type: DataTypes.STRING,
                allowNull: true
            },
            isEmbedUrl: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
            modelName: MODELS.spaces_courses_lessons,
            tableName: TABLES.spaces_courses_lessons,
            underscored: true
        }
    );

    return spacesCoursesLessons;
};
