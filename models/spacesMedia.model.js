const { Model, DataTypes } = require("sequelize");
const { MODELS, TABLES } = require("../utils/constant");
module.exports = (sequelize) => {
    class spacesMedia extends Model {

    }

    spacesMedia.init(
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
            fileName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            entityType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            entityId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            mediaUrl: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mediaType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            featureMedia: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
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
            modelName: MODELS.spaces_media,
            tableName: TABLES.spaces_media,
            underscored: true
        }
    );

    return spacesMedia;
};
