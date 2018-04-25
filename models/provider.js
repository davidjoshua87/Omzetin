/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/
/*jshint -W030*/

'use strict';

let bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
   var Provider = sequelize.define('Provider', {
      name: DataTypes.STRING,
      email: {
         type: DataTypes.STRING,
         validate: {
            isEmail: {
               args: true,
               msg: 'email invalid'
            }
         },
         unique: {
           msg: 'Validation error : email is already use'
         }
      },
      password: DataTypes.STRING,
      service: DataTypes.STRING,
      price: DataTypes.INTEGER
   }, {});
   Provider.associate = function(models) {
      // associations can be defined here
   };

   Provider.hook('beforeSave', (provider, options) => {
      let saltRounds = 10;
      let salt = bcrypt.genSaltSync(saltRounds);
      let hash = bcrypt.hashSync(provider.password, salt);
   });
   return Provider;
};
