var _ = require('lodash');

module.exports = function() {
  return _.sampleSize(
    [
      {nom : "Biscuits bretzels apéritifs", description:"petits biscuits apéritifs salés", prix:"4,90€"},
      {nom:"Pain viennois", description:"pain long à croûte souple et brillante",prix:"4,90€"},
      {nom:"Salade Tomate Moza", description:"une bouchée de fraicheur avec des produits bios",prix:"14,50€"},
      {nom:"Salade César", description:"véritable salade césar, pas du tout celle du grand M",prix:"7,99€"},
      {nom:"plateau charcuterie", description:"saucisson, jambon de parme, jambon cru, chorizo",prix:"24,90€"}, 
      {nom:"plateau fromage", description:"comté, morbier, mont d'or, tomme de chevre",prix:"23,90€"}, 
      {nom:"tappas", description:"mixte de petit produit bio",prix:"25,00€"},
      {nom:"potage aux chicons", description:"velouté aux endives",prix:"14,00€"},
      {nom:"Chicons à la béchamel", description:"endives à la béchamel",prix:"16,99€"},
      {nom:"potee liegeoise", description:"salade composée avec des haricots verts, des pommes de terre, et des lardons",prix:"21,99€"},
      {nom:"oeufs mimosa", description:"oeufs coupés en deux avec de la mayonnaise",prix:"9,99€"},
      {nom:"socca", description:"spécialité niçoise à base de poids chiches",prix:"6,49€"},
      {nom:"petits farcis", description:"spécialité niçoise. Légumes farcis",prix:"13,49€"},
      {nom:"pissaladiere", description:"spécialité niçoise à l'oignon",prix:"5,29€"},
      {nom:"Flamenkuch", description:"spécialité lorraine à l'oignon",prix:" 13,23€"},
      {nom:"plateau de tapenade noire", description:"tapenade avec des olives bios noires",prix:"8,54€"},
      {nom:"oeufs cocotte", description:"oeufs cocotte classique",prix:"10,00€"},
      {nom:"terrine de poulet au vin blanc et fines herbes", description:"terrine de poulet fait maison",prix:"24,46€"},
      {nom:"salade nicoise", description:"spécialité niçoise",prix:"15,00€"}
    ],10);
}
