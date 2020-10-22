var _ = require('lodash');

module.exports = function() {
  return _.sampleSize(
    [
      {nom: "Pates carbonara", description:"spécialité italienne avec des oeufs",prix:"21,15€"},
      {nom: "Pizza margerita" , description:"spécialité italienne, tomates, mozzarella, basilic",prix:"15,00€"},
      {nom: "Knödel", description:"plat autrichien variante salée à base de pain",prix:"25,00€"},
      {nom: "burger Maison",  description:"salade, tomate, oignon, steack de boeuf, cheddar",prix:"13,99€"},
      {nom: "cheese burger",  description:"steack de boeuf, cheddar, oignons fondus, tomate", prix:"16,45€"},
      {nom: "burritos",  description:"spécialité mexicaine",prix:"15,00€"},
      {nom: "ramen au porc",  description:"spécialité japonaise à base de porc",prix:"21,00€"},
      {nom: "ramen végétarien", description:"spécialité japonaise à base de légumes",prix:"23,00€"},
      {nom: "nouilles sautées", description:"spécialité chinoises",prix:"19,00€"},
      {nom: "Blanc de poulet au chicon et au philadelphia", description:"Blanc de poulet au chicon et au philadelphia",prix:"16,90€"},
      {nom: "chicons crevettes mayonnaise", description:"endives aux crevettes et à la mayonnaise",prix:"15,30€"},
      {nom: "Carbonnade flamande", description:"morceaux de boeufs braisés",prix:"23,50€"},
      {nom: "Boulette Liègeoise Express", description:"boulette de viande avec frites",prix:"13,00€"},
      {nom: "Waterzoï de poulet", description:"soupe mijoté",prix:"17,00€"},
      {nom: "Filet américain", description:"filet de poulet grillé",prix:"20,00€"},
      {nom: "Tartiflette", description:"gratin de pommes de terre, oignons, lardons, gratiné au reblochon",prix:"26,10€"},
      {nom: "Boeuf bourguignon", description:"plat en sauce au boeuf spécialité bressane",prix:"27,30€"},
      {nom: "Croque-Monsieur", description:"sandwich grillé avec jambon fromage bechamel",prix:"9,10€"},
      {nom: "Steak tartare", description:"boeuf cru avec jaune d'oeuf",prix:"13,50€"},
      {nom: "Quiche lorraine", description:"quiche lorraine avec lardons, fromage, oeufs",prix:"14,50€"},
      {nom: "Gratin dauphinois", description:"gratin de pommes de terre et lait",prix:"13,00€"},
      {nom: "Cassoulet", description:"plat à base de haricots blancs, et de viande",prix:"15,30€"},
      {nom: "Hachis parmentier", description:"purée de pomme de terre et viande haché",prix:"19,00€"}
    ],10);
}
