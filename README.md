# RestaurantVueJS

## Présentation du projet

Le projet restaurants est un projet d'université ayant pour but de prendre en main la technologie VueJS.
La partie serveur est présente mais n'est pas le point pertinent du projet.

le projet est disponible à l'adresse suivante :
https://valentinbordy.fr/tripadvisar/

proposé par [michel buffa ](https://github.com/micbuffa)

## Points remarquables du projet

Le projet possède certains points remarquables comme l'envoi de mail pour confirmer une commande, l'ajout à la base de données pour chaque restaurants d'une carte (menu), de medias (image).

- Système de commande avec formulaire de façon persistence et envoi de mail avec un recapitulatif de la commande.
- Système de reservation en ligne de façon persistence.
- Ajout des menus via un panel Admin de façon persistence.
- Ajout des medias via un panel Admin de façon persistence. (l'image n'est pas ajouté à la base de données mais juste l'id de cette dernière).
- Détail d'un restaurant avec la note, l'emplacement du restaurant avec une carte, carte/menu du restaurant et l'image.
- Ajout d'un restaurant.
- Modification du nom ou de la cuisine d'un restaurant.
- Suppression d'un restaurant.

**Les données seront à importer dans la page/panel Admin du projet**. Cette page est la juste pour importer les données.

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

Une fois arrivé sur cette page ( Admin ) il faudra vérifier que le serveur node est toujours lancé, puis cliquez sur le bouton **"Ajouter les menus"** et dans un second temps sur le bouton **"Ajouter les medias"**.

## disclaimer

tous les mots de passe apparents ont été changés, les mots de passe présents sont les anciens pour expliquer comment cela fonctionne.
