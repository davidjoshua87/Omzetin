'use strict';
module.exports = (sequelize, DataTypes) => {
  var Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    service: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Provider.associate = function(models) {
    // associations can be defined here
  };
  return Provider;
};