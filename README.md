# RestaurantVueJS

## Installation du projet
Pour installer le projet faire un clone de ce dernier ou le télécharger.
une fois ceci fait il faut se rendre dans le dossier du projet.
Ensuite rendez-vous dans le dossier du projet.
### Installation du serveur node :
Une fois rendu dans le dossier du projet il faut faire les commandes suivantes pour installer le serveur:
```sh
cd serveur
```
puis:
```sh
npm i
```

### Lancer le serveur node :
Pour lancer le serveur il faut faire la commande suivante:
```sh
node .\serverCrudWithMongo.js 
```


Le serveur se lancera sur le port 80. **Attention vérifier que le serveur est bien lancé !**

### Installation du client vueJS :
Pour installer le **client vueJS** il faut faire les commandes suivantes à la racine du projet ( dans un terminal différente du serveur node ):
```sh
cd clientVueJS\restaurants\
```
puis:
```sh
npm i
```
#### Lancer le client :
Pour lancer le client il faut faire la commande :
```sh
npm run serve
```

## Mise à jour des données via l'application 

Pour mettre à jour les données via l'application dans sur la page Admin.

Pour s'y rendre vous pouvez passer par le menu ou via l'adresse suivante:
http://localhost:8080/admin
en fonction de ou se lance votre projet ( quel port ) a voir dans le terminal dédié au client vueJS.
![](https://cdn.discordapp.com/attachments/774685916148531242/774685931629707304/unknown.png)

Une fois arrivé sur cette page ( Admin ) il faudra vérifier que le serveur node est toujours lancé, puis cliquez sur le bouton **"Ajouter les menus"** et dans un second temps **"Ajouter les medias"**.
