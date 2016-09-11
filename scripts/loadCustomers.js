'use strict';

let fs = require('fs'),
    debug = require('debug')('delivery-admin:script:load:customers');

let file = './scripts/julho.csv';

// fs.readFile(file, {encoding: 'utf-8'}, function(err, data) {
//   if (err) {
//     return process.exit(1);
//   }

//   data = data.toString('utf-8');

//   debug('data', data);
// });

customerMapper();

function customerMapper(line) {
  line = '7-May,Sáb.,Érika,"Rua Albertina Vieira das Silva Gordo, 212/ 32 bl 2",Vila Aurora,,,2,130,25,0,,,,,1,70,,,1,85,,,,,,,,,,,,,,,,,,,,,,,Cartão de Débito,9-May,Carlos,3.11,Folhadinho,Maio';
  let data = line.split(',');

  let address = data[3].replace(/"/g, '').split(/,|\//);

  console.log(data[3]);

  let customer = {
    givenName: data[2],
    familyName: null,
    nickName: null,
    gender: null,
    email: null,
    telephones: null,
    birthDate: null,
    cpf: null,
    address: {
      streetAddress: address[1],
      number: address[2],
      district: null,
      complement: address[3],
      referencePoint: null,
      addressLocality: null,
      addressRegion: null,
      postalCode: null
    }
  };

  debug(customer);
  return customer;
}
