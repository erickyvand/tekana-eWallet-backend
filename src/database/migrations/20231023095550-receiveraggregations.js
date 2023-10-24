const query = `
  SELECT "receiverId", "firstName", "lastName", SUM(amount) "totalAmount"
  FROM financial.transactions t
  JOIN authentication.customers c
  ON c.id = t."receiverId"
  Group BY "receiverId", "firstName", "lastName"	
`;

const view = 'financial.receiveraggregations';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${view} AS ${query};`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${view}`);
  },
};
