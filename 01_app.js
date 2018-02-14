const express = require('express');

const app = express();

const fs = require('fs');
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser')
/* on associe le moteur de vue au module «ejs» */
//app.set('view engine', 'ejs'); // générateur de template
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");



app.get('/', (req, res) => {
  	 let cursor = db.collection('adresse')
                .find()
                .toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('gabarit.ejs', {adresses: resultat}) 
 }) 
})


let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })

app.post('/ajouter', (req, res) => {
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/')
 })
})


})