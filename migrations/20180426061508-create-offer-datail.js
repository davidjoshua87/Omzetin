/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

'use strict';

const {
   sequelize
} = require('../models');

module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('OfferDatails', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         customer_name: {
            type: Sequelize.STRING
         },
         service_name: {
            type: Sequelize.STRING
         },
         description: {
            type: Sequelize.STRING
         },
         bidding_price: {
            type: Sequelize.INTEGER
         },
         OfferId: {
            type: Sequelize.INTEGER
         },
         createdAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
         },
         updatedAt: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
         }
      }, {
         timestamps: true
      });
   },
   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('OfferDatails');
   }
};
