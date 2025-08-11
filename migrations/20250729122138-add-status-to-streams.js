"use strict";

const { TABLES } = require("../utils/constant");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLES.streams, "status", {
      type: Sequelize.ENUM("pending", "live", "ended"),
      defaultValue: "pending",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLES.streams, "status");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_streams_status";');
  },
};
