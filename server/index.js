const express = require("express"); // perchè stiamo utilizzando un server express
const server = express(); // usiamo server perchè è il nome con il quale abbiamo chiamato il nostro server
const cors = require("cors"); // per poter usare server e website nello stesso pc. In questa riga lo stiamo importando dopo aver scaricato la libreria (npm i cors)
const database = require("./models"); // sincronizza le nostre tabelle con il database

// Definisci le origini consentite
const allowedOrigins = [
  "workout-3ywyc4o7a-andreas-projects-13e88ddf.vercel.app", // Frontend su Vercel
  "https://workout-1-1wxl.onrender.com", // Backend su Render
  "workout-sand.vercel.app",
];

// Configura CORS per consentire solo le origini specificate
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Consenti l'origine
    } else {
      callback(new Error("Non autorizzato"), false); // Rifiuta l'origine
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "authtoken"],
  credentials: true, // Se utilizzi cookie o sessioni
};

server.use(cors(corsOptions)); // Applica la configurazione CORS
server.use(express.json()); // Per il parsing del corpo delle richieste JSON

// Definisci i router
const usersRouter = require("./routes/users");
server.use("/users", usersRouter);

const createSchedaRouter = require("./routes/createScheda");
server.use("/createScheda", createSchedaRouter);

// Sincronizza il database e avvia il server
database.sequelize.sync().then(() => {
  server.listen(5555, () => {
    console.log("App in esecuzione sulla porta 5555");
  });
});
