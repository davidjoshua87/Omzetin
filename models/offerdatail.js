'use strict';
module.exports = (sequelize, DataTypes) => {
   var OfferDatail = sequelize.define('OfferDatail', {
      service_name: DataTypes.STRING,
      description: DataTypes.STRING,
      bidding_price: DataTypes.INTEGER,
      OfferId: DataTypes.INTEGER
   }, {});
   OfferDatail.associate = function(models) {
      // associations can be defined here
      OfferDatail.belongsTo(models.Offer);
   };
   return OfferDatail;
};
