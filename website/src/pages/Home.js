import CreateAccount from "./components/CreateAccount";
import React, { useContext } from "react";
import "../styles/Home.css";
import { AuthContext } from "../services/AuthContext";
import Scheda from "./components/Scheda";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("AuthToken");
    navigate("/entry");
    setAuth(false);
    toast.success("You have logged Out!");
  };
  return (
    <div className="sfondo">
      <div className="containerButton">
        <button className="buttonLogout" type="button" onClick={onLogout}>
          LOGOUT
        </button>
      </div>
      {auth?.livello ? <Scheda /> : <CreateAccount />}
    </div>
  );
}

export default Home;
