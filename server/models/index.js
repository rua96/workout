"use strict"; //Abilita la modalità "strict" di JavaScript, che aiuta a scrivere codice più sicuro e meno soggetto a errori.

/*fs: Modulo Node.js per gestire il file system.
path: Modulo Node.js per gestire percorsi di file e directory.
Sequelize: Libreria ORM (Object-Relational Mapping) per interagire con il database.
process: Modulo di Node.js per accedere alle variabili di ambiente e al processo attivo.
basename: Ottiene il nome del file corrente (ad esempio index.js).
env: Ottiene l'ambiente corrente dall'ambiente NODE_ENV (ad esempio development, production o test). Se non è definito, utilizza development.
config: Carica la configurazione del database per l'ambiente corrente dal file config.js.
db: Un oggetto vuoto che conterrà i modelli e l'istanza di Sequelize.*/

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

/*Instanza di Sequelize per connettersi al database.
Se config.use_env_variable è definito, usa una variabile di ambiente per connettersi al database (utile per la produzione).
Altrimenti, utilizza le credenziali specificate in config.database, config.username e config.password.*/

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

/*Usa fs.readdirSync per leggere tutti i file nella directory corrente (__dirname).
Filtra i file:
Non devono iniziare con ..
Non devono essere il file stesso (basename).
Devono terminare con .js.
Non devono essere file di test (.test.js).
Per ogni file trovato:
Importa il file (che definisce un modello Sequelize).
Inizializza il modello con sequelize e Sequelize.DataTypes.
Aggiunge il modello all'oggetto db con la chiave model.name.*/

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

/*Per ogni modello in db:
Se il modello ha un metodo associate, lo chiama.
Questo permette ai modelli di definire relazioni tra di loro.*/

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/*Aggiunge l'istanza di Sequelize (sequelize) e la libreria Sequelize (Sequelize) all'oggetto db.
Esporta db per essere utilizzato nel resto del progetto.*/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/*Questo file:

Configura la connessione al database utilizzando Sequelize.
Carica automaticamente tutti i modelli nella directory corrente.
Configura le associazioni tra i modelli.
Esporta un oggetto db contenente i modelli e l'istanza di Sequelize.
È una configurazione standard in progetti Sequelize e centralizza la gestione di modelli e connessioni al database.*/
