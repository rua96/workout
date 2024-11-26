import "../../styles/CreateAccount.css";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../services/AuthContext";

function CreateAccount() {
  const { setAuth, auth } = useContext(AuthContext);
  const [account, setAccount] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [cognome, setCognome] = useState("");
  const [peso, setPeso] = useState("");
  const [altezza, setAltezza] = useState("");
  const [sesso, setSesso] = useState("uomo");
  const [livello, setLivello] = useState("principiante");
  const onCreate = async (e) => {
    e.preventDefault();

    console.log("data", username, name, cognome, peso, altezza, sesso, livello);

    if (!username) {
      toast.error("Inserisci uno username");
      return;
    }

    if (!name) {
      toast.error("Inserisci il tuo nome");
      return;
    }
    if (!cognome) {
      toast.error("Inserisci il tuo cognome");
      return;
    }
    if (!peso) {
      toast.error("Inserisci il tuo peso");
      return;
    }
    if (!altezza) {
      toast.error("Inserisci il tuo altezza");
      return;
    }
    if (!sesso) {
      toast.error("Inserisci il tuo sesso");
      return;
    }
    if (!livello) {
      toast.error("Inserisci il tuo livello");
      return;
    }
    let response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/users/details",
      {
        username: username,
        name: name,
        cognome: cognome,
        peso: peso,
        altezza: altezza,
        sesso: sesso,
        livello: livello,
        email: auth.email,
      },
      { headers: { authToken: localStorage.getItem("AuthToken") } }
    );

    if (response?.data?.error) {
      toast.error(response.data.error);
    } else {
      toast.success("Dati aggiunti");
      localStorage.setItem("AuthToken", response?.data?.token);
      setAuth({
        ...auth,
        livello: livello,
      });
    }
  };
  return (
    <div className="CreateAccountContainer">
      <h1 className="mainTitle">WORKOUT</h1>
      <div className="CreateAccountCard">
        <h2 className="CreateAccountTitle">CREATE ACCOUNT</h2>
        <h4 className="husername"> Create Username : </h4>
        <input
          className="inputusernameCreate"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="divDati">
          <div className="wrapper">
            <h4 className="hnomeCreate">nome : </h4>
            <input
              className="inputName"
              type="text"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <h4 className="hnomeCreate">cognome : </h4>
            <input
              className="inputName"
              type="text"
              placeholder="Cognome"
              onChange={(e) => setCognome(e.target.value)}
            />
          </div>
        </div>
        <div className="divDati">
          <div className="wrapper">
            <h4 className="hnomeCreate">peso : </h4>
            <input
              className="inputName"
              type="text"
              placeholder="Peso"
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>
          <div className="wrapper">
            <h4 className="hnomeCreate">altezza : </h4>
            <input
              className="inputName"
              type="text"
              placeholder="Altezza"
              onChange={(e) => setAltezza(e.target.value)}
            />
          </div>
        </div>
        <div className="divDati">
          <div className="wrapper">
            <h4 className="hnomeCreate">sesso : </h4>
            <select
              className="inputName"
              type="text"
              placeholder="Sesso"
              onChange={(e) => setSesso(e.target.value)}
            >
              <option value="uomo">Uomo</option>
              <option value="donna">Donna</option>
              <option value="NonBinary">NonBinary</option>
            </select>
          </div>
          <div className="wrapper">
            <h4 className="hnomeCreate">livello allenamento : </h4>
            <select
              className="inputName"
              type="text"
              placeholder="Livello"
              onChange={(e) => setLivello(e.target.value)}
            >
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzato">Avanzato</option>
            </select>
          </div>
        </div>
        <button
          className="buttonCreateAccount"
          type="submit"
          onClick={onCreate}
        >
          CREATE
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;
