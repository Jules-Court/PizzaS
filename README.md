# Programmation web

PizzaS est un site de livraison de pizzas à domicile.
Le site propose des pizzas composable ou non, des entrées, des desserts et des boissons.

# Pré-requis
PizzaS utilise JQuery, express.js, NodeJS
Comme base de données, PostgreSQL.
Les ports utilisés : 
- Pour le serveur : 3000,
- Pour la base de données : 5432

# Back-end
Le site fonctionne avec la base de données PSQL. Pour pouvoir la lancer, il faut se connecter a son compte en lancant la commande : 
``` 
psql -U postgres
```
Il faut ensuite lancer le script database.sql pour la création de la base de données, puis lancer le script insert.sql pour insérer les données.
Il faut au préalable avoir mis le bon mot de passe dans le fichier db.js !

Pour pouvoir installer les modules nécessaire, il faut faire la commande 
``` 
npm install 
```

# Lancement
Après avoir mis le back-end en place, faire la commande :
``` 
node index
```
Se rendre ensuite sur son navigateur a l'adresse suivant : http://localhost:3000/

# Si le site charge bien la base de donnée, mais ne fais aucune interaction ;

Remplacer dans le fichier index.js les __dirname par le chemin absolu vers les fichiers.  
Exemple, remplacer :  
 <b>"res.sendFile(__dirname+ '/app.js');"</b>  
par : <b> res.sendFile("chemin/absolu/vers" + '/app.js');</b>



# Options 

Si vous êtes un livreur, se rendre a l'adresse suivante : http://localhost:3000/livraison

# Fonctionnement 

Pour remplir le panier, il faut se rendre dans les différentes catégorites, et ensuite appuyer sur le bouton : Ajouter au panier.  
Les produits apparaiteront dans la section Panier sur la droite de la page.
Pour validé une commande, appuyer sur le bouton Commander, puis entrer ses informations.
