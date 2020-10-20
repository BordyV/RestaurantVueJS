var nbMenuVal = 0;
var nbRestaurantAModifier = 0;
// REQUETES GET
function updateMenu(pageSize) {
    debugger
     let url = "/api/restaurants?page=" +
     0 +
     "&pagesize=" + pageSize

	fetch(url)
		.then(function(responseJSON) {
        	responseJSON.json()
        	.then(function(res) {
                
                // Si on récupère une seule donnée on relance la requete pour récupèrer tout les restaurants
                if(res.data.length == 1)
                {
                    debugger
                    this.nbRestaurantAModifier = res.count; 
                    this.updateMenu(res.count);
                }
                //sinon ça veut dire qu'on récupère tout les restaurants
                else{
                    lesRestaurants = res.data;
                    for(const rest of lesRestaurants)
                    {
                        this.ajouterMenu(rest._id);
                    }
                }
        	});
    	})
    	.catch(function (err) {
        	console.log(err);
    });
}

function afficheReponseGET(reponse) {
    let div = document.querySelector("#Resto");
    div.innerHTML = reponse.data;
}
function afficheReponseAjoutRestaurant() {
    this.nbMenuVal++;
    let div = document.querySelector("#MenuCount");
    div.innerHTML = ""; 
    div.innerHTML = this.nbMenuVal + " / " +this.nbRestaurantAModifier ;
}



// REQUETES PUT
function ajouterMenu(idRes) {
    let id = idRes; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    let url = "/api/restaurantsMenu/" + id;

    fetch(url, {
        method: "put",

    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                this.afficheReponseAjoutRestaurant();
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}