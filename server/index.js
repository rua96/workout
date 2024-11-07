const express = require("express"); // perchè stiamo utilizzando un server express
const server = express(); // usiamo server perchè è il nome con il quale abbiamo chiamato il nostro server
const cors = require("cors"); // per poter usare server e website nello stesso pc. In questa riga lo stiamo importando dopo aver scaricato la libreria (npm i cors)

const database = require("./models"); // sincronizza le nostre tabelle con il database

server.use(cors()); // aggiungiamo cors al server
server.use(express.json()); //per dire al server che usiamo json

database.sequelize.sync().then(() => {
  server.listen(5555, () => {
    // è una funzione sempre di express, e stiamo mettendo il server in stato di ascolto e gli passiamo port ( nel nostro caso 5555) , ()=>{}  questo vuol dire che è una funzione
    console.log("App is running on PORT 5555");
  });
});

// per far partire il server, serve che scriviamo una riga nel package.json :   "start":"node index.js" ,

// per il database, installiamo libreria sequelize : nel server facciamo  -> npm i sequelize sequelize-cli mysql2  .
//  poi -> npx sequelize init .. Esegue pacchetti npm senza doverli installare globalmente. In questo caso, esegue sequelize senza richiedere l’installazione globale del pacchetto.
