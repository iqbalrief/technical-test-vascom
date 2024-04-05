'use strict'
const {
  faker
} = require('@faker-js/faker');



const product = [...Array(10)].map(() => ({

  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: 200000,
  stock: 50,
  createdAt: new Date(),
  updatedAt: new Date()

}))
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', product, {
      validate: true,
      individualHooks: true
    });

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  },
};