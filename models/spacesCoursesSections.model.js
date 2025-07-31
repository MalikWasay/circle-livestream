const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");

module.exports = (sequelize) => {
    class spacesCoursesSections extends Model {
        static associate(models) {
            this.belongsTo(models[MODELS.spaces_courses], {
                foreignKey: "spaceCourseId",
                as: "spacesCourses"
            });
            this.hasMany(models[MODELS.spaces_courses_lessons], {
                foreignKey: "sectionId",
                as: "spacesCoursesLessons"
            });
        }
    }

    spacesCoursesSections.init(
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
            spaceCourseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: TABLES.spaces_courses,
                    key: "id"
                }
            },
            schedule: {
                type: DataTypes.DATE,
                allowNull: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: true
            },
            isEmailNotification: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            emailNotification: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: null
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
            modelName: MODELS.spaces_courses_sections,
            tableName: TABLES.spaces_courses_sections,
            underscored: true
        }
    );
    return spacesCoursesSections;
};
