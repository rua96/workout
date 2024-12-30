import React, { useContext, useState } from "react";
import axios from "axios";
import "../../styles/Scheda.css";
import { toast } from "react-toastify";
import esercizi from "../../services/Programma";
import { AuthContext } from "../../services/AuthContext";

function Scheda() {
  const { auth, setAuth } = useContext(AuthContext);
  const [scheda, setScheda] = useState("A");

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
      </div>
      <div className="eserciziTableContainer"></div>
      <table className="eserciziTable">
        <thead>
          <tr>
            <th>Esercizio</th>
            <th>Link Youtube</th>
            <th>Set x Reps</th>
            <th>Rest</th>
          </tr>
        </thead>
        <tbody>
          {esercizi
            .filter((value) => value.livello === auth.livello)[0]
            .schede.filter((value) => value.nome === scheda)[0]
            .esercizi.map((value, index) => (
              <tr key={index}>
                <td>{value.esercizio}</td>
                <td>
                  <a
                    className="youfiglio"
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Guarda il video
                  </a>
                </td>
                <td>{value.set}</td>
                <td>{value.rest}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Scheda;
