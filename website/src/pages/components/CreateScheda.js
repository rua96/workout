import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../../styles/CreateScheda.css";
import esercizi from "../../services/Esercizi.json";
import Menu from "./Menu";
import { toast } from "react-toastify";
import { AuthContext } from "../../services/AuthContext";

function CreateScheda() {
  const { auth } = useContext(AuthContext);
  const [listaEsercizi, setListaEsercizi] = useState([
    { esercizio: "", setReps: "", notes: "", rest: "" },
  ]);
  const [schedaSelezionata, setSchedaSelezionata] = useState("A");
  const [settimanaSelezionata, setSettimanaSelezionata] =
    useState("settimana1");

  // Funzione per caricare i dati salvati della scheda
  const caricaSchedaSalvata = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/createScheda/${auth.id}`, // Assicurati che questa route restituisca la scheda dell'utente
        {
          headers: { authToken: localStorage.getItem("AuthToken") },
        }
      );

      if (response?.data?.scheda) {
        let schede = response.data.scheda.filter((scheda) => {
          return scheda.lettera == schedaSelezionata;
        });
        if (schede.length > 0) {
          let scheda = schede[0];
          console.log(scheda);
          setListaEsercizi(scheda.exercises);
        }
      }
    } catch (error) {
      console.error("Errore nel caricamento della scheda:", error);
      toast.error("Errore durante il recupero della scheda.");
    }
  };

  // Chiamare caricaSchedaSalvata() al caricamento della pagina
  useEffect(() => {
    caricaSchedaSalvata();
  }, []); // L'array di dipendenze è vuoto, quindi questa funzione si chiamerà solo al primo caricamento del componente

  // Funzione per aggiornare esercizi
  const aggiornaEsercizio = (index, campo, valore) => {
    const nuovaLista = [...listaEsercizi];
    nuovaLista[index][campo] = valore;
    setListaEsercizi(nuovaLista);
  };

  // Aggiungere esercizi
  const aggiungiEsercizio = () => {
    setListaEsercizi([
      ...listaEsercizi,
      { esercizio: "", setReps: "", notes: "", rest: "" },
    ]);
  };

  const salvaScheda = async () => {
    const schedaDaSalvare = {
      userId: auth.id,
      scheda: schedaSelezionata,
      settimana: settimanaSelezionata,
      esercizi: listaEsercizi.filter((esercizio) => esercizio.esercizio !== ""),
    };

    if (
      listaEsercizi.filter((esercizio) => {
        return esercizio.id != null;
      }).length > 0
    ) {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/createscheda`,
        schedaDaSalvare,
        {
          headers: { authToken: localStorage.getItem("AuthToken") },
        }
      );
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/createscheda`,
          schedaDaSalvare,
          {
            headers: { authToken: localStorage.getItem("AuthToken") },
          }
        );
        toast.success("Scheda salvata con successo!");
      } catch (error) {
        console.error("Errore nel salvataggio:", error);
        toast.error("Errore durante il salvataggio della scheda.");
      }
    }
  };

  return (
    <div className="sfondo">
      <Menu />
      <div className="bisnonnoCreate">
        <div className="genitoreschedeCreate">
          <select
            className="inputSettimanaCreate"
            value={schedaSelezionata}
            onChange={(e) => setSchedaSelezionata(e.target.value)}
          >
            <option value="A">Scheda A</option>
            <option value="B">Scheda B</option>
            <option value="C">Scheda C</option>
          </select>
          <select
            className="inputSettimanaCreate"
            value={settimanaSelezionata}
            onChange={(e) => setSettimanaSelezionata(e.target.value)}
          >
            <option value="settimana1">Settimana 1</option>
            <option value="settimana2">Settimana 2</option>
            <option value="settimana3">Settimana 3</option>
            <option value="settimana4">Settimana 4</option>
            <option value="settimana5">Settimana 5</option>
          </select>
        </div>

        <div className="nonnoCreate">
          <div className="genitoreCreate">
            <div className="figlioSuCreate">Esercizio</div>
            <div className="figlioSuCreate">Link Youtube</div>
            <div className="figlioSuCreate">Set x Reps</div>
            <div className="figlioSuCreate">Notes</div>
            <div className="figlioSuCreate">Rest</div>
          </div>

          {listaEsercizi.map((esercizio, index) => (
            <div key={index} className="genitoreCreate">
              <div className="figlioCreate">
                <select
                  className="inputSettimanaCreate"
                  value={esercizio.esercizio}
                  onChange={(e) =>
                    aggiornaEsercizio(index, "esercizio", e.target.value)
                  }
                >
                  <option value="">Seleziona un esercizio</option>
                  {esercizi.map((ex, idx) => (
                    <option key={idx} value={ex.esercizio}>
                      {ex.esercizio}
                    </option>
                  ))}
                </select>
                <button
                  className="buttonRemove"
                  onClick={() =>
                    setListaEsercizi(
                      listaEsercizi.filter((_, i) => i !== index)
                    )
                  }
                >
                  Rimuovi
                </button>
              </div>
              <div className="figlioCreate">
                <a
                  className="youfiglioCreate"
                  href={
                    esercizi.find((ex) => ex.esercizio === esercizio.esercizio)
                      ?.link || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {esercizio.esercizio ? "Guarda il video" : "Nessun video"}
                </a>
              </div>
              <div className="figlioCreate">
                <input
                  type="text"
                  className="inputSettimanaCreate"
                  placeholder="Set x Reps"
                  value={esercizio.setReps}
                  onChange={(e) =>
                    aggiornaEsercizio(index, "setReps", e.target.value)
                  }
                />
              </div>
              <textarea
                className="figliotextareaCreate"
                placeholder="Pesi utilizzati"
                value={esercizio.notes}
                onChange={(e) =>
                  aggiornaEsercizio(index, "notes", e.target.value)
                }
              ></textarea>
              <div className="figlioCreate">
                <input
                  type="text"
                  className="inputSettimanaCreate"
                  placeholder="Tempo di riposo"
                  value={esercizio.rest}
                  onChange={(e) =>
                    aggiornaEsercizio(index, "rest", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <div className="aggiungiEsalva">
            <button className="buttonAdd" onClick={aggiungiEsercizio}>
              Aggiungi Esercizio
            </button>
            <button className="buttonSalva" onClick={salvaScheda}>
              Salva Scheda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateScheda;
