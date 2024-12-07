import React, { useContext, useState } from "react";
import axios from "axios";
import "../../styles/CreateScheda.css";
import esercizi from "../../services/Esercizi.json";
import Menu from "./Menu";
import { toast } from "react-toastify";
import { AuthContext } from "../../services/AuthContext";

function CreateScheda() {
  const { auth } = useContext(AuthContext);
  const [listaEsercizi, setListaEsercizi] = useState([
    { nome: "", setReps: "", note: "", rest: "" },
  ]);
  const [schedaSelezionata, setSchedaSelezionata] = useState("A");
  const [settimanaSelezionata, setSettimanaSelezionata] =
    useState("settimana1");

  const cambiaScheda = (e) => {
    setSchedaSelezionata(e.target.value);
    setListaEsercizi([{ nome: "", setReps: "", note: "", rest: "" }]);
  };
  const cambiaSettimana = (e) => {
    setSettimanaSelezionata(e.target.value);
    setListaEsercizi([{ nome: "", setReps: "", note: "", rest: "" }]);
  };

  const aggiungiEsercizio = () => {
    setListaEsercizi([
      ...listaEsercizi,
      { nome: "", setReps: "", note: "", rest: "" },
    ]);
  };
  const salvaScheda = async () => {
    const schedaDaSalvare = {
      userId: auth.id,
      scheda: schedaSelezionata,
      settimana: settimanaSelezionata,
      esercizi: listaEsercizi.filter((esercizio) => esercizio.nome !== ""),
    };

    console.log("Scheda da salvare:", schedaDaSalvare);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/createscheda`,
        schedaDaSalvare,
        {
          headers: { authToken: localStorage.getItem("AuthToken") },
        }
      );

      // Logga la risposta del server
      console.log("Risposta del server:", response.data);

      if (response.status === 200) {
        toast.success("Scheda salvata con successo!");
      } else {
        toast.error("Errore nel salvataggio della scheda.");
      }
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
      toast.error("Errore durante la richiesta al server.");
    }
  };

  const rimuoviEsercizio = (index) => {
    const nuovaLista = listaEsercizi.filter((_, i) => i !== index);
    setListaEsercizi(nuovaLista);
  };

  const aggiornaEsercizio = (index, campo, valore) => {
    const nuovaLista = [...listaEsercizi];
    nuovaLista[index][campo] = valore;
    setListaEsercizi(nuovaLista);
  };

  const eserciziFiltrati = esercizi.filter(
    (ex) =>
      ex.scheda === schedaSelezionata && ex.settimana === settimanaSelezionata
  );

  return (
    <div className="sfondo">
      <Menu />
      <div className="bisnonnoCreate">
        <div className="genitoreschedeCreate">
          <select
            className="inputSettimanaCreate"
            value={schedaSelezionata}
            onChange={cambiaScheda}
          >
            <option value="A">Scheda A</option>
            <option value="B">Scheda B</option>
            <option value="C">Scheda C</option>
          </select>
          <select
            className="inputSettimanaCreate"
            value={settimanaSelezionata}
            onChange={cambiaSettimana}
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
                  value={esercizio.nome}
                  onChange={(e) =>
                    aggiornaEsercizio(index, "nome", e.target.value)
                  }
                >
                  <option value="">Seleziona un esercizio</option>
                  {esercizi.map((ex, idx) => (
                    <option key={idx} value={ex.nome}>
                      {ex.nome}
                    </option>
                  ))}
                </select>
                <button
                  className="buttonRemove"
                  onClick={() => rimuoviEsercizio(index)}
                >
                  Rimuovi
                </button>
              </div>
              <div className="figlioCreate">
                <a
                  className="youfiglioCreate"
                  href={
                    esercizi.find((ex) => ex.nome === esercizio.nome)?.link ||
                    "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {esercizio.nome ? "Guarda il video" : "Nessun video"}
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
                value={esercizio.note}
                onChange={(e) =>
                  aggiornaEsercizio(index, "note", e.target.value)
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
