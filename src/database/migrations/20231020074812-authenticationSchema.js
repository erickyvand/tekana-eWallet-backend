module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('authentication');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema('authentication');
  }
};
