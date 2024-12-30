const express = require("express");
const router = express.Router();
const { gymTab, exercise } = require("../models");
const { validateToken } = require("../middlewares/Authentication");
const { Op } = require("sequelize");

router.post("/", validateToken, async (req, res) => {
  const { userId, scheda, settimana, esercizi } = req.body;

  console.log("Dati ricevuti:", { userId, scheda, settimana, esercizi });

  try {
    // Creazione della scheda
    // Determina gli esercizi specifici in base alla lettera della scheda (A, B, C)
    let eserciziPersonalizzati;
    if (scheda === "A") {
      eserciziPersonalizzati = esercizi.filter((e) => e.tipo === "forza");
    } else if (scheda === "B") {
      eserciziPersonalizzati = esercizi.filter((e) => e.tipo === "resistenza");
    } else if (scheda === "C") {
      eserciziPersonalizzati = esercizi.filter((e) => e.tipo === "mobilità");
    } else {
      return res.status(400).json({ error: "Tipo di scheda non valido." });
    }

    // Salva la scheda personalizzata
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
        esercizio: esercizi[i].esercizio,
        setReps: esercizi[i].setReps,
        notes: esercizi[i].note,
        rest: esercizi[i].rest,
        gymTabId: gymtabella.id,
        status: "active",
      });

      // Logga ogni esercizio creato
      console.log("Esercizio creato:", exerciseCreated);
    }

    // Risposta positiva al client
    return res.status(201).json({
      message: "Scheda e esercizi creati con successo",
      gymTab: gymtabella,
    });
  } catch (error) {
    console.error(
      "Errore durante la creazione della scheda o degli esercizi:",
      error
    );
    // Risposta con errore se qualcosa va storto
    return res.status(500).json({
      message: "Errore durante la creazione della scheda",
      error: error.message,
    });
  }
});

router.get("/:userId", validateToken, async (req, res) => {
  //qui prendo gli esercizi
  const { userId } = req.params;

  let schede = await gymTab.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: exercise,
        separate: true, // Esegue una query separata per gli esercizi
        order: [["createdAt", "ASC"]], // Ordina per data di creazione in ordine crescente
        where: {
          status: {
            [Op.ne]: "deleted",
          },
        },
      },
    ],
  });

  return res.json({ scheda: schede });
});

router.patch("/", validateToken, async (req, res) => {
  const { userId, scheda, esercizi } = req.body;

  try {
    // Trova la scheda esistente per l'utente e la lettera specificata
    let schedaCreata = await gymTab.findOne({
      where: {
        userId: userId,
        lettera: scheda, // Usa il valore corretto di "scheda" passato nel corpo della richiesta
      },
    });

    // Se la scheda non esiste, restituisci un errore
    if (!schedaCreata) {
      return res.status(404).json({ message: "Scheda non trovata" });
    }

    // Aggiorna o crea esercizi
    for (let esercizio of esercizi) {
      if (esercizio.id) {
        // Aggiorna l'esercizio esistente
        await exercise.update(
          {
            esercizio: esercizio.esercizio,
            setReps: esercizio.setReps,
            notes: esercizio.notes,
            rest: esercizio.rest,
            status: "active",
          },
          {
            where: { id: esercizio.id },
          }
        );
      } else {
        // Crea un nuovo esercizio per la scheda
        await exercise.create({
          esercizio: esercizio.esercizio,
          setReps: esercizio.setReps,
          notes: esercizio.notes,
          rest: esercizio.rest,
          gymTabId: schedaCreata.id,
          status: "active",
        });
      }
    }

    // Restituisci la scheda aggiornata con i relativi esercizi
    const schedaAggiornata = await gymTab.findOne({
      where: { id: schedaCreata.id },
      include: [{ model: exercise }],
    });

    return res.status(200).json({
      message: "Scheda aggiornata con successo",
      scheda: schedaAggiornata,
    });
  } catch (error) {
    console.error("Errore durante l'aggiornamento della scheda:", error);
    return res.status(500).json({
      message: "Errore durante l'aggiornamento della scheda",
      error: error.message,
    });
  }
});
//nel get non posso passare un body perchè nel post cerco di mandare dati, invece get prende i dati. quindi non sto mandando dati.
// **Nuova parte per cancellare l'esercizio**
router.delete("/esercizio/:id", validateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Trova l'esercizio da eliminare
    const esercizio = await exercise.findOne({
      where: { id: id },
    });

    // Se l'esercizio non esiste, restituisci un errore
    if (!esercizio) {
      return res.status(404).json({ message: "Esercizio non trovato" });
    }

    // Cancella l'esercizio
    await exercise.update(
      {
        status: "deleted",
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({ message: "Esercizio rimosso con successo" });
  } catch (error) {
    console.error("Errore durante la cancellazione dell'esercizio:", error);
    return res.status(500).json({
      message: "Errore durante la cancellazione dell'esercizio",
      error: error.message,
    });
  }
});

module.exports = router;
