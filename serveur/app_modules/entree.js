var _ = require('lodash');

module.exports = function() {
  return _.sampleSize(
    [
      "Biscuits bretzels apéritifs",
      "Pain viennois",
      "Salade Tomate Moza",
      "Salade César",
      "plateau charcuterie", 
      "plateau fromage", 
      "tappas",
      "potage aux chicons",
      "Chicons à la béchamel",
      "potee liegeoise",
      "oeufs mimosa",
      "soca",
      "petits farcis",
      "pissaladiere",
      "Flamenkuch",
      "Tapenade noire",
      "oeufs cocotte",
      "terrine de poulet au vin blanc et fines herbes",
      "salade nicoise"
    ],10);
}
