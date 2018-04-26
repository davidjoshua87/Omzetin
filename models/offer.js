/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Offer = sequelize.define('Offer', {
    CustomerId: DataTypes.INTEGER,
    ProviderId: DataTypes.INTEGER
  }, {});
  Offer.associate = function(models) {
    // associations can be defined here
    Offer.belongsTo(models.Customer);
    Offer.belongsTo(models.Provider);

  };
  return Offer;
};
