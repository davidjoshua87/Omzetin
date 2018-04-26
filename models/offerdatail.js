/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

'use strict';
module.exports = (sequelize, DataTypes) => {

   var OfferDatail = sequelize.define('OfferDatail', {
      customer_name: DataTypes.STRING,
      service_name: DataTypes.STRING,
      description: DataTypes.STRING,
      bidding_price: DataTypes.INTEGER,
      OfferId: DataTypes.INTEGER,
      status: DataTypes.STRING
   }, {});
   OfferDatail.associate = function(models) {
      // associations can be defined here
      OfferDatail.belongsTo(models.Offer);
   };
   return OfferDatail;
};
