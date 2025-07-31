"use strict";

const { TABLES } = require("../utils/constant");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLES.user_streams, {
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: TABLES.users,
          key: "id",
        },
      },
      stream_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: TABLES.streams,
          key: "id",
        },
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
    await queryInterface.addIndex(TABLES.user_streams, ["created_at"], {
      name: "user_streams_created_at_index",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      TABLES.user_streams,
      "user_streams_created_at_index"
    );
  },
};
