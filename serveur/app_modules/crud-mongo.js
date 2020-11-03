var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var _ = require('lodash');

var assert = require('assert');
//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

exports.connexionMongo = function (callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		assert.equal(null, err);
		callback(err, db);
	});
}

exports.countRestaurants = function (name, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		console.log("db " + db)
		if (!err) {
			if (name == '') {
				db.collection('restaurants')
					.count()
					.then(rep => callback(rep));
			} else {
				let query = {
					"name": { $regex: ".*" + name + ".*", $options: "i" }
				}
				db.collection('restaurants')
					.find(query)
					.count()
					.then(rep => callback(rep));

			}
		}
	});
};

exports.findRestaurants = function (page, pagesize, name, callback) {
	MongoClient.connect(url, function (err, client) {

		var db = client.db(dbName);

		console.log("db " + db)
		if (!err) {
			if (name == '') {
				db.collection('restaurants')
					.find()
					.skip(page * pagesize)
					.limit(pagesize)
					.toArray()
					.then(arr => {
						db.collection('restaurants')
							.count()
							.then(rep => callback(arr, rep))
					});
			}
			else {
				let query = {
					"name": { $regex: ".*" + name + ".*", $options: "i" }
				}
				db.collection('restaurants')
					.find(query)
					.skip(page * pagesize)
					.limit(pagesize)
					.toArray()
					.then(arr => {
						db.collection('restaurants')
							.find(query)
							.count()
							.then(rep => callback(arr, rep))
					});
			}
		}
		else {
			callback(-1);
		}
	});
};

exports.findRestaurantById = function (id, callback) {
	MongoClient.connect(url,{
		useNewUrlParser: true,
		useUnifiedTopology: true
  }, function (err, client) {
		var db = client.db(dbName);
		if (!err) {
			// La requete mongoDB

			let myquery = { "_id": ObjectId(id) };

			db.collection("restaurants")
				.findOne(myquery, function (err, data) {
					let reponse;

					if (!err) {
						reponse = {
							succes: true,
							restaurant: data,
							error: null,
							msg: "Details du restaurant envoyés"
						};
					} else {
						reponse = {
							succes: false,
							restaurant: null,
							error: err,
							msg: "erreur lors du find"

						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				restaurant: null,
				error: err,
				msg: "erreur de connexion à la base"
			};
			callback(reponse);
		}
	});
}

exports.createRestaurant = function (formData, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {

			let toInsert = {
				name: formData.name,
				cuisine: formData.cuisine
			};
			console.dir(JSON.stringify(toInsert));
			db.collection("restaurants")
				.insert(toInsert, function (err, insertedId) {
					let reponse;

					console.log('++++' + insertedId)

					if (!err) {
						reponse = {
							succes: true,
							result: insertedId.ops[0]._id,
							error: null,
							msg: "Ajout réussi " + insertedId.ops[0]._id
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à l'insertion"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de l'insertion, erreur de connexion."
			};
			callback(reponse);
		}
	});
}

exports.updateRestaurant = function (id, formData, callback) {

	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {
			let myquery = { "_id": ObjectId(id) };
			let newvalues = { $set: { name: formData.name, cuisine: formData.cuisine } };

			db.collection("restaurants")
				.updateOne(myquery, newvalues, function (err, result) {
					if (!err) {
						reponse = {
							succes: true,
							result: result,
							error: null,
							msg: "Modification réussie " + result
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à la modification"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de la modification, erreur de connexion."
			};
			callback(reponse);
		}
	});
}

exports.deleteRestaurant = function (id, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {
			let myquery = { "_id": ObjectId(id) };

			db.collection("restaurants")
				.deleteOne(myquery, function (err, result) {
					if (!err) {
						reponse = {
							succes: true,
							result: result,
							error: null,
							msg: "Suppression réussie " + result
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à la suppression"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de la suppression, erreur de connexion."
			};
			callback(reponse);
		}
	});
}


var entrees = require('./entree');
var plats = require('./plat');
var desserts = require('./desert');

// exports.AddMenuToRestaurant = function(id, callback) {

// 	MongoClient.connect(url, function(err, client) {
// 		var db = client.db(dbName);
// 		var menu1 =  
// 				{
// 					 entree: entrees() ,
// 					 plat: plats(),
// 					 dessert: desserts() 
// 				};


// 		if(!err) {
//             let myquery = { "_id": ObjectId(id)};
// 	        let newvalues = { $set: {menu: menu1 } };

// 			db.collection("restaurants")
// 			.updateOne(myquery, newvalues, function(err, result) {
// 	         	if(!err){
// 			    	reponse = {
// 		                succes : true,
// 		                result: result,
// 		                error : null,
// 		                msg: "Modification réussie " + result
// 		            };
// 			   	} else {
// 		            reponse = {
// 		                succes : false,
// 		                error : err,
// 		                msg: "Problème à la modification"
// 		            };
// 			    }
// 			    callback(reponse);
// 	        });
// 		} else{
// 			let reponse = reponse = {
//                     	succes: false,
//                         error : err,
//                         msg:"Problème lors de la modification, erreur de connexion."
//                     };
//             callback(reponse);
// 		}
// 	});
// }


// var async = require("async");


exports.AddMenuToRestaurant1 = function () {

	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {
			console.log("Debut requete addMenu");
			//pour chaque doc dans la collection restaurants
			db.collection("restaurants").find().forEach(() => {
				var q = async.queue(function (doc, callback) {

					let myquery = { "_id": ObjectId(doc._id) };
					var menu1 =
					{
						entree: entrees(),
						plat: plats(),
						dessert: desserts()
					};
					let newvalues = { $set: { menu: menu1 } };


					//on va update les valeurs
					db.collection("restaurants")
						.updateOne(myquery, newvalues, function (err, result) {
							if (!err) {

							} else {
								console.log(err);

							}
						});

					var cursor = db.collection("restaurants").find();
					cursor.each(function (err, doc) {
						if (err) throw err;
						if (doc) q.push(doc); // dispatching doc to async.queue
					});

					q.drain = function () {
						if (cursor.isClosed()) {
							console.log('all items have been processed');
							db.close();
						}
					}

				}
				)
			});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de la modification, erreur de connexion."
			};
			callback(reponse);
		}
	});
}


//je recupere tout les ids mais seulement les ids des restaurants et je rajoute dans le menu dans la collection menu 
//avec un champ idRestaurant.

exports.AddMenuToRestaurant = function (callback) {


	MongoClient.connect(url, async function (err, client) {
		var db = client.db(dbName);
		var menu1 =
		{
			entree: entrees(),
			plat: plats(),
			dessert: desserts()
		};


		if (!err) {

			const restaurantsID = await db.collection("restaurants").find({}, { _id: 1 });
			//pour chaque restaurant dans le find du dessus 
			//on recupere restau qui est le restaurant a update
			restaurantsID.forEach((restau) => {
				var document =
				{
					entree: entrees(),
					plat: plats(),
					dessert: desserts(),
					restaurantID: restau._id
				};

				db.collection("menus").insertOne(document).catch(() => {
					//le catch n'est la que pour ne pas afficher l'erreur quand quelqu'un essaie d'insèrer plusieurs fois les
					// données dans la collections /!\ attention les opérations en cours (moins de 5sec) ne sont pas terminés
				});
			}).then(() => {
				//si c'est une réussite on créer un index qui doit être unique merci le cours de M. Mopolo *hehehe* -> rire de M. Mopolo
				db.collection("menus").createIndex({ restaurantID: 1 }, { unique: true }).then(() => {
					console.log("index restaurantID ajouté avec succès à la collection menus");
					//variable pour le callback
					reponse = {
						succes: true,
						error: null,
						msg: "Ajout des menus réussis!"
					};
					callback(reponse);
				});
				console.log("fin de l'ajout des menus !");
			}).catch((err) => {
				console.log("Erreur lors de la fin de l'ajout des menus");
				reponse = {
					succes: false,
					restaurant: null,
					error: err,
					msg: "erreur lors de l'ajout des menus"
				}
				callback(reponse);
			});


		}
		//si on ne recupere pas la base
		else {
			reponse = {
				succes: false,
				restaurant: null,
				error: err,
				msg: "erreur lors de la récupération de la base"
			}
			callback(reponse);
		}
	});

}

//methode pour récuperer un menu en fonction de l'id du restaurant
//ATTENTION /!\ un restaurant ne peut avoir qu'un seul menu contrainte d'unicité via l'index restaurantID
exports.findMenuByRestaurantId = function (id, callback) {
	MongoClient.connect(url,{
   		useNewUrlParser: true,
   		useUnifiedTopology: true
 	}, function (err, client) {
		var db = client.db(dbName);
		if (!err) {
			// La requete mongoDB

			let myquery = { "restaurantID": ObjectId(id) };

			db.collection("menus")
				.findOne(myquery, function (err, data) {
					let reponse;

					if (!err) {
						reponse = {
							succes: true,
							menu: data,
							error: null,
							msg: "Details du menu du restaurant envoyés"
						};
					} else {
						reponse = {
							succes: false,
							menu: null,
							error: err,
							msg: "erreur lors du find du menu"

						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				restaurant: null,
				error: err,
				msg: "erreur de connexion à la base"
			};
			callback(reponse);
		}
	});
}

const nodemailer = require('nodemailer');

var motDePasse = require('./mail');

exports.createCommande = function (dataCommande, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {

			// creation du transporter pour le mail via @nodeMailer
			let transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 587,
				secure: false,
				requireTLS: true,
				auth: {
					user: 'restaurantvuejsbor@gmail.com',
					pass: motDePasse
				}
				});
				console.log(dataCommande.messageClient);
				//si le message est null
				let messageClientAEnvoyer = !dataCommande.messageClient ? "<em>Aucun message</em>" : dataCommande.messageClient; 

				//on fait les variables pour savoir ce que le client a prit comme entree
				let tabEntree  ="Vous avez choisi comme entree(s) : <br>";
				for(const entree of JSON.parse(dataCommande.entrees))
				{
					tabEntree += "<strong> " + entree.nom + " " + entree.prix+ " </strong> <br>"
				}

				//on fait les variables pour savoir ce que le client a prit comme plat
				let tabplat  ="Vous avez choisi comme plat(s) : <br>";
				for(const plat of JSON.parse(dataCommande.plats))
				{
					tabplat += "<strong> " + plat.nom + " " + plat.prix+ " </strong> <br>"
				}

				//on fait les variables pour savoir ce que le client a prit comme dessert
				let tabDessert  ="Vous avez choisi comme dessert(s) : <br>";
				for(const dessert of JSON.parse(dataCommande.desserts))
				{
					tabDessert += "<strong> " + dessert.nom + " " + dessert.prix+ " </strong> <br>"
				}

				//mail details
				 mailOptions = {
				 from: 'restaurantvuejsbor@gmail.com',
				 to: dataCommande.mailClient,
				 subject: 'Confirmation commande Tripadvisar mail automatique ne pas répondre',
				 html: '<p>Bonjour Mr.<strong>' + dataCommande.nomClient + ' ' + dataCommande.prenomClient + '</strong></p>' + 
				 '<br><p>Nous accusons bonne réception de votre commande pour l&rsquo;adresse : <strong>' + dataCommande.addresseClient + '</strong></p>'
				 + '<p>Vous avez transmis comme message au restaurant/livreur : <strong>' + messageClientAEnvoyer + '</strong></p>'  +
				 '<p>' + tabEntree +' </p>' + '<p>' + tabplat +' </p>' + '<p>' + tabDessert +' </p><br>'+
				 '<p>et pour un total de : <strong>'+ dataCommande.totalPrix +'€</strong> </p>'+
				  '<p><em>Ce mail est un envoi automatique, votre réponse ne sera pas prise en compte.<br>Merci de votre commande, l&rsquo;equipe de Tripadvisar.</em></p>',	
				};
			

			let toInsert = {
				restaurantID: dataCommande.idRestaurant,
				nomClient: dataCommande.nomClient,
				prenomClient: dataCommande.prenomClient,
				addresseClient: dataCommande.addresseClient,
				mailClient: dataCommande.mailClient,
				messageClient: dataCommande.messageClient,
				entrees: JSON.parse(dataCommande.entrees),
				plats: JSON.parse(dataCommande.plats),
				desserts: JSON.parse(dataCommande.desserts)
			};
			console.dir(JSON.stringify(toInsert));
			db.collection("commande")
				.insert(toInsert, function (err, insertedId) {
					let reponse;

					console.log('++++' + insertedId)

					if (!err) {
						reponse = {
							succes: true,
							result: insertedId.ops[0]._id,
							error: null,
							msg: "Ajout réussi " + insertedId.ops[0]._id
						};

						transporter.sendMail(mailOptions, (error, info) => {
							if (error) {
							   return console.log("mail erreur" + error.message);
							}
						  console.log('mail success');
						  }); 


					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à l'insertion"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de l'insertion, erreur de connexion."
			};
			callback(reponse);
		}
	});
}


exports.createReservation = function (dataCommande, callback) {
	MongoClient.connect(url, function (err, client) {
		var db = client.db(dbName);

		if (!err) {


			let toInsert = {
				restaurantID: dataCommande.idRestaurant,
				nomReservation: dataCommande.nameReservation,
				heureReservation: dataCommande.heureReservation
			};
			console.dir(JSON.stringify(toInsert));
			db.collection("reservation")
				.insert(toInsert, function (err, insertedId) {
					let reponse;

					console.log('++++' + insertedId)

					if (!err) {
						reponse = {
							succes: true,
							result: insertedId.ops[0]._id,
							error: null,
							msg: "Ajout réussi " + insertedId.ops[0]._id
						};

					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à l'insertion"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de l'insertion, erreur de connexion."
			};
			callback(reponse);
		}
	});
}

//methode pour récuperer les reservations en fonction de l'id du restaurant
exports.findReservationByRestaurantId = function (id, callback) {
	MongoClient.connect(url,{
   		useNewUrlParser: true,
   		useUnifiedTopology: true
 	}, function (err, client) {
		var db = client.db(dbName);
		if (!err) {
			// La requete mongoDB

			let myquery = { "restaurantID": id };

			db.collection("reservation")
				.findOne(myquery, function (err, data) {
					let reponse;
					
					if (!err) {
						reponse = {
							succes: true,
							lesReservations: data,
							error: null,
							msg: "Les reservations du restaurant envoyés"
						};
					} else {
						reponse = {
							succes: false,
							menu: null,
							error: err,
							msg: "erreur lors du find des reservations"

						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				restaurant: null,
				error: err,
				msg: "erreur de connexion à la base"
			};
			callback(reponse);
		}
	});
}