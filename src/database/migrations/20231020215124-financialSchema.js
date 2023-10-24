module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('financial');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema('financial');
  },
};
