'use strict';

const projectData = require('../data/project.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    //  Add seed commands here.
    
    //  Example:
     await queryInterface.bulkInsert('Projects',projectData, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    //  Add commands to revert seed here.
    
    //  Example:
     await queryInterface.bulkDelete('Projects', null, {});
    
  }
};
