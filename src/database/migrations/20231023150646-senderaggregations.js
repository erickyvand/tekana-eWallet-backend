const query = `
  SELECT "senderId", "firstName", "lastName", SUM(amount) "totalAmount"
  FROM financial.transactions t
  JOIN authentication.customers c
  ON c.id = t."senderId"
  Group BY "senderId", "firstName", "lastName"	
`;

const view = 'financial.senderaggregations';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE VIEW ${view} AS ${query};`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DROP VIEW ${view}`);
  },
};
