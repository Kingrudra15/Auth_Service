'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
    //Add seed commands here.
     await queryInterface.bulkInsert('Roles', [
      {
        name: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: 'CUSTOMER',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'AIRLINE BUISINESS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
