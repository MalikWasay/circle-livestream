"use strict";

const { TABLES } = require("../utils/constant");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLES.streams, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ref_no: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stream_key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: TABLES.users,
          key: "id",
        },
      },
      playback_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex(TABLES.streams, ["created_at"], {
      name: "streams_created_at_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      TABLES.streams,
      "streams_created_at_index"
    );
  },
};
