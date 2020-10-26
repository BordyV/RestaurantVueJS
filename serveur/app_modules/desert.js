var _ = require('lodash');

module.exports = function() {
  return _.sampleSize(

[ 
  {nom:"panna cotta au fruits rouges", description:"spécialité italienne, crème cuite au fruits rouges",prix:"14,00€"},
  {nom:"panna cotta au chocolat", description:"spécialité italienne, crème cuite au chocolat",prix:"14,00€"},
  {nom:"Forêt noire maison", description:"gateau au chocolat et au cerise maison",prix:"18,99€"},
  {nom:"Petits pains viennois", description:"pains long et sucré à la croute souple et brillante",prix:"4,15€"},
  {nom:"Café viennois", description:"café avec ses viennoiseries",prix:"5,15€"},
  {nom:"Tarte aux noix et chocolat", description:"tarte au chocolat avec ses noix",prix:"7,00€"},
  {nom:"Chocolat chaud viennois", description:"chocolat chaud avec ses viennoiseries",prix:"5,15€"},
  {nom:"Strudel aux pommes", description:"variante de gateau aux pommes",prix:"13,99€"},
  {nom:"Apfelstrudel à la noix", description:"variante du Strudel à la noix",prix:"13,99€"},
  {nom:"Forêt noire aux cerises noires", description:"gateau au chocolat et au cerise noire",prix:"13,00€"},
  {nom:"forêt noire", description:"gateau au chocolat et au cerise",prix:"7,99€"},
  {nom:"turgoule", description:" riz au lait facon normande",prix:"11,00€"},
  {nom:"tiramisu au café", description:"spécialité italienne ",prix:"14,45€"},
  {nom:"tiramisu au chocolat", description:"spécialité italienne au café",prix:"14,45€"},
  {nom:"tiramisu au fraise", description:"spécialité italienne au fraise",prix:"14,45€"},
  {nom:"1 boule de glace au choix",  description:"gout: vanille, fraise, framboise, chocolat, poire",prix:"3,00€"},
  {nom:"2 boules de glaces au choix", description:"gout: vanille, fraise, framboise, chocolat, poire",prix:"4,00€"},
  {nom:"3 boules de glaces au choix", description:"gout: vanille, fraise, framboise, chocolat, poire",prix:"4,50€"},
  {nom:"zinzolin à la vanille", description:"zinzolin rouge à la vanille",prix:"1,00€"},
  {nom:"Bûche de Noël forêt noire", description:"gateau au chocolat et au cerise façon buche",prix:"15,00€"},
  {nom:"Café gourmand", description:"café avec ses miniardises",prix:"5,10€"},
  {nom:"tarte au sucre", description:"tarte au sucre maison",prix:"13,00€"},
  {nom:"Bonbon chocolat", description:"assortiment de bonbons 3 chocolats",prix:"6,00€"},
  {nom:"Gaufres de bruxelles",  description:"veritables gaufres de bruxelles",prix:"13,23€"},
  {nom:"Crêpes", description:"crêpes nature, sucre ou nutella",prix:"4,30€"},
  {nom:"Tarte Tatin", description:"tarte tatin maison",prix:"4,00€"},
  {nom:"Pommes au four", description:"pommes au four bio",prix:"6,00€"},
  {nom:"Crème caramel", description:"crème caramel avec soupçon de vanille",prix:"13,00€"},
  {nom:"profiteroles", description:"profiteroles patissières",prix:"13,70€"}
  
],10);
}