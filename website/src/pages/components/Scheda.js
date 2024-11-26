import React, { useContext, useState } from "react";
import "../../styles/Scheda.css";
import esercizi from "../../services/Programma";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";

function Scheda() {
  const { auth, setAuth } = useContext(AuthContext);
  const [scheda, setScheda] = useState("A");
  const navigate = useNavigate();
  return (
    <div className="bisnonno">
      <div className="genitoreschede">
        <select
          className="inputSettimana"
          type="text"
          placeholder="Scheda"
          onChange={(e) => setScheda(e.target.value)}
        >
          <option value="A">Scheda A</option>
          <option value="B">Scheda B</option>
          <option value="C">Scheda C</option>
        </select>
        <select className="inputSettimana" type="text" placeholder="Settimana">
          <option value="settimana1">Settimana 1</option>
          <option value="settimana2">Settimana 2</option>
          <option value="settimana3">Settimana 3</option>
          <option value="settimana4">Settimana 4</option>
          <option value="settimana5">Settimana 5</option>
        </select>
      </div>
      <div className="nonno">
        <div className="genitore">
          <div className="figlio">Esercizio</div>
          <div className="figlio">Link Youtube</div>
          <div className="figlio">Set x Reps</div>
          <div className="figlio">Notes</div>
          <div className="figlio">Rest</div>
        </div>

        {esercizi
          .filter((value) => {
            return value.livello === auth.livello;
          })[0]
          .schede.filter((value) => value.nome === scheda)[0]
          .esercizi.map((value) => {
            return (
              <div className="genitore">
                <div className="figlio">{value.esercizio}</div>
                <div className="figlio">
                  <a
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Guarda il video
                  </a>
                </div>
                <div className="figlio">{value.set}</div>
                <textarea
                  className="figliotextarea"
                  placeholder="Pesi utilizzati"
                ></textarea>
                <div className="figlio">{value.rest}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Scheda;
