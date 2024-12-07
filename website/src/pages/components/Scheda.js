import React, { useContext, useState } from "react";
import axios from "axios";
import "../../styles/Scheda.css";
import { toast } from "react-toastify";
import esercizi from "../../services/Programma";
import { AuthContext } from "../../services/AuthContext";

function Scheda() {
  const { auth, setAuth } = useContext(AuthContext);
  const [scheda, setScheda] = useState("A");
  const [settimana, setSettimana] = useState("settimana1");

  const onChangeLivello = async (value) => {
    let response = await axios.patch(
      process.env.REACT_APP_SERVER_URL + "/users",
      {
        livello: value,
        id: auth.id,
      },
      { headers: { authToken: localStorage.getItem("AuthToken") } }
    );

    console.log("Token", response?.data);

    if (response?.data?.error) {
      toast.error(response.data.error);
    } else {
      localStorage.setItem("AuthToken", response?.data?.token);
      setAuth({
        ...auth,
        livello: value,
      });
    }
  };

  return (
    <div className="bisnonno">
      <div className="genitoreschede">
        <select
          className="inputSettimana"
          type="text"
          placeholder="Livello"
          onChange={(e) => onChangeLivello(e.target.value)}
          selected={auth.livello}
        >
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzato">Avanzato</option>
        </select>
        <select
          className="inputSettimana"
          type="text"
          placeholder="Livello"
          onChange={(e) => setScheda(e.target.value)}
        >
          <option value="A">Scheda A</option>
          <option value="B">Scheda B</option>
          <option value="C">Scheda C</option>
        </select>
        <select
          className="inputSettimana"
          onChange={(e) => setSettimana(e.target.value)}
          value={settimana}
        >
          <option value="settimana1">Settimana 1</option>
          <option value="settimana2">Settimana 2</option>
          <option value="settimana3">Settimana 3</option>
          <option value="settimana4">Settimana 4</option>
          <option value="settimana5">Settimana 5</option>
        </select>
      </div>
      <div className="nonno">
        <div className="genitore">
          <div className="figlioSu">Esercizio</div>
          <div className="figlioSu">Link Youtube</div>
          <div className="figlioSu">Set x Reps</div>
          <div className="figlioSu">Notes</div>
          <div className="figlioSu">Rest</div>
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
                    className="youfiglio"
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
