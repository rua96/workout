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
    { esercizio: "", setReps: "", notes: "", rest: "", status: "active" },
  ]);
  const [schedaSelezionata, setSchedaSelezionata] = useState("A");

  // Funzione per caricare i dati salvati della scheda
  const caricaSchedaSalvata = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/createScheda/${auth.id}`,
        {
          headers: { authToken: localStorage.getItem("AuthToken") },
        }
      );

      if (response?.data?.scheda) {
        let schede = response.data.scheda.filter((scheda) => {
          return scheda.lettera === schedaSelezionata;
        });
        if (schede.length > 0) {
          let scheda = schede[0];
          setListaEsercizi(scheda.exercises);
        } else {
          setListaEsercizi([]); // Resetta se non ci sono schede
        }
      }
    } catch (error) {
      console.error("Errore nel caricamento della scheda:", error);
      toast.error("Errore durante il recupero della scheda.");
    }
  };

  // Chiamare caricaSchedaSalvata() ogni volta che cambia schedaSelezionata
  useEffect(() => {
    caricaSchedaSalvata();
  }, [schedaSelezionata]);

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
      { esercizio: "", setReps: "", notes: "", rest: "", status: "active" },
    ]);
  };

  const salvaScheda = async () => {
    const schedaDaSalvare = {
      userId: auth.id,
      scheda: schedaSelezionata, // Usa schedaSelezionata per specificare la lettera
      esercizi: listaEsercizi.filter((esercizio) => esercizio.esercizio !== ""),
    };

    try {
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
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/createscheda`,
          schedaDaSalvare,
          {
            headers: { authToken: localStorage.getItem("AuthToken") },
          }
        );
      }
      toast.success("Scheda salvata con successo!");
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
      toast.error("Errore durante il salvataggio della scheda.");
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
        </div>

        <div className="eserciziTableContainerCreate">
          <table className="eserciziTableCreate">
            <thead>
              <tr>
                <th>Esercizio</th>
                <th>Link Youtube</th>
                <th>Set x Reps</th>
                <th>Notes</th>
                <th>Rest</th>
                <th>Rimuovi</th>
              </tr>
            </thead>
            <tbody>
              {listaEsercizi.map((esercizio, index) => (
                <tr key={index}>
                  <td>
                    <select
                      className="SelezioneEsercizio"
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
                  </td>
                  <td>
                    <a
                      className="youfiglioCreate"
                      href={
                        esercizi.find(
                          (ex) => ex.esercizio === esercizio.esercizio
                        )?.link || "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Guarda il video
                    </a>
                  </td>
                  <td>
                    <input
                      className="SetReps"
                      type="text"
                      placeholder="Set x Reps"
                      value={esercizio.setReps}
                      onChange={(e) =>
                        aggiornaEsercizio(index, "setReps", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="SetReps"
                      placeholder="Notes"
                      type="text"
                      value={esercizio.notes}
                      onChange={(e) =>
                        aggiornaEsercizio(index, "notes", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      className="SetReps"
                      placeholder="Rest"
                      type="text"
                      value={esercizio.rest}
                      onChange={(e) =>
                        aggiornaEsercizio(index, "rest", e.target.value)
                      }
                    />
                  </td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
  );
}

export default CreateScheda;
