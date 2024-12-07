const express = require("express");
const router = express.Router();
const { gymTab, exercise } = require("../models");
const { validateToken } = require("../middlewares/Authentication");

router.post("/", validateToken, async (req, res) => {
  const { userId, scheda, settimana, esercizi } = req.body;

  console.log("Dati ricevuti:", { userId, scheda, settimana, esercizi });

  try {
    // Creazione della scheda
    let gymtabella = await gymTab.create({
      lettera: scheda,
      userId: userId,
    });

    // Verifica se "esercizi" è un array valido e non vuoto
    if (!Array.isArray(esercizi) || esercizi.length === 0) {
      return res.status(400).json({ message: "Esercizi non validi" });
    }

    // Ciclo per creare gli esercizi
    for (let i = 0; i < esercizi.length; i++) {
      // Creazione dell'esercizio
      const exerciseCreated = await exercise.create({
        esercizio: esercizi[i].nome,
        setReps: esercizi[i].setReps,
        notes: esercizi[i].note,
        rest: esercizi[i].rest,
        gymTabId: gymtabella.id,
      });

      // Logga ogni esercizio creato
      console.log("Esercizio creato:", exerciseCreated);
    }

    // Risposta positiva al client
    return res
      .status(201)
      .json({
        message: "Scheda e esercizi creati con successo",
        gymTab: gymtabella,
      });
  } catch (error) {
    console.error(
      "Errore durante la creazione della scheda o degli esercizi:",
      error
    );
    // Risposta con errore se qualcosa va storto
    return res
      .status(500)
      .json({
        message: "Errore durante la creazione della scheda",
        error: error.message,
      });
  }
});

module.exports = router;
