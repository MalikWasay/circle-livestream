const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
const { validSpaceCourseType, validLessonsStatus } = require("../config/generalConfig.json");
module.exports = (sequelize) => {
    class spacesCourses extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces], {
                foreignKey: "spaceId",
                as: "spaces"
            });
            this.hasMany(models[MODELS.spaces_courses_sections], {
                foreignKey: "spaceCourseId",
                as: "spacesCoursesSections"
            });
            this.belongsTo(models[MODELS.user], {
                foreignKey: "createdBy",
                as: "user"
            });
        }
    }

    spacesCourses.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.users,
                    key: "id"
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: true
            },
            refNo: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            option: {
                type: DataTypes.JSON,
                defaultValue: {
                    lessonOrderEnforcement: false
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
            courseType: {
                type: DataTypes.ENUM(...validSpaceCourseType),
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
            modelName: MODELS.spaces_courses,
            tableName: TABLES.spaces_courses,
            underscored: true
        }
    );
    return spacesCourses;
};
