const Sequelize = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable("company", {
      cid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("gen_random_uuid()")
      },
      cname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      estyear: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    }); 
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};