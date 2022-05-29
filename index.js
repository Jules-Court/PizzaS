let formulaire = [];
var cpt=0;
formulaire[0] = {
    numero : cpt,
    nom: "Pas encore de client",
    prenom: "",
    adresse: "",
    code: "",
    phone: "",
    mail: "",
    time: "",
    cmd: ""
};


const express = require('express');
const app = express();
const pool = require("./db");
const path = require('path');
app.use(express.json()); // pour req.body
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.use('/img', express.static('img'));
app.set('view engine', 'ejs');



// get all Produit
app.get('/app.js', function (req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname+ '/app.js');
});
app.get('/composable.js', function (req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/composable.js');
});
app.get('/menu.js', function (req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/menu.js');
});
app.get('/style.css', function (req, res) {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname+ '/style.css');
});

app.get('/', async (req, res) => {
    console.log(req.body);
    res.sendFile(path.join(__dirname + '/views/main.html'));
});
var commande;
app.post('/', async (req, res) => {
    commande=JSON.stringify(req.body);
    JSON.parse(commande);
    
});
app.get('/menu', async (req, res) => {
    res.sendFile(path.join(__dirname + '/views/menu.html'));
});

app.get('/compose', async (req, res) => {
    res.sendFile(path.join(__dirname + '/views/composable.html'));
});
app.get('/form', async (req, res) => {
    res.sendFile(path.join(__dirname+ '/views/form.html'));
});



app.post('/form', (req, res) => {

    formulaire[cpt+1] = {
        numero: cpt+1,
        nom: req.body.name,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        code: req.body.code,
        phone: req.body.phone,
        mail: req.body.email,
        time: req.body.heure,
        cmd: commande
    };
    console.log(formulaire);
    cpt++;

    res.redirect('/');
});

app.get('/livraison', (req, res) => {

    res.redirect('/livraison/0');

});

app.get('/livraison/:num', (req, res) => {

    res.render('livreur.ejs', formulaire[req.params.num]);


});

app.post('/livraison/:num', (req, res) => {

    if(req.params.num<cpt){
        res.redirect('/livraison/' + (++req.params.num));

    }
    else{
        res.redirect('/livraison/' + (req.params.num));

    }
    

});





app.get('/produit', async (req, res) => {


    try {

        const allProduit = await pool.query("SELECT * FROM Produit");

        res.json(allProduit.rows);

    }
    catch (err) {
        console.error(err);
    }
});



// get one Produit
app.get('/produit/:name', async (req, res) => {
    const { name } = req.params

    try {

        const oneProduit = await pool.query("SELECT * FROM Produit WHERE category=$1", [name]);
        //console.log(oneProduit);
        res.json(oneProduit.rows);

    }
    catch (err) {
        console.error(err);
    }

});

// create a Produit
app.post("/produit", async (req, res) => {

    try {

        const { name } = req.body;
        const newProduit = await pool.query("INSERT INTO Produit VALUES ($1 ,2,'petit','boisson','img/fanta.png','description') RETURNING *", [name]);

        res.json(newProduit.rows[0]);
    }
    catch (e) {
        console.error(e);
    }


})

// update a Produit

// delete a Produit

app.listen(3000, () => {
    console.log('listening on port 3000');
})