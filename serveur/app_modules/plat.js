var _ = require('lodash');

module.exports = function() {
  return _.sampleSize(
    [
      "Pates carbonara",
      "Pizza margerita" ,
      "Knödel (plat autrichien variante salée à base de pain)",
      "burger Maison", 
      "cheese burger", 
      "burritos", 
      "ramen au porc", 
      "ramen végétarien",
      "nouilles sautées",
      "Blanc de poulet au chicon et au philadelphia",
      "chicons crevettes mayonnaise",
      "Carbonnade flamande",
      "Boulette Liègeoise Express",
      "Waterzoï de poulet",
      "Filet américain",
      "Tartiflette",
      "Boeuf bourguignon",
      "Croque-Monsieur",
      "Steak tartare",
      "Quiche lorraine",
      "Gratin dauphinois",
      "Cassoulet",
      "Hachis parmentier",
    ],10);
}
