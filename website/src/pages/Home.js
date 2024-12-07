import CreateAccount from "./components/CreateAccount";
import React, { useState, useContext } from "react";
import "../styles/Home.css";
import Menu from "./components/Menu";
import { AuthContext } from "../services/AuthContext";
import Scheda from "./components/Scheda";
import { useNavigate } from "react-router-dom";

function Home() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Show");
  const { login } = useContext(AuthContext);
  /*const onLogout = () => {
    localStorage.removeItem("AuthToken");
    navigate("/entry");
    setAuth(false);
    toast.success("You have logged Out!");
  };*/
  return (
    <div className="sfondo">
      <Menu
        setMenu={(value) => setMenu(value)}
        menu={menu}
        username={auth?.username}
      />
      {auth?.livello ? <Scheda /> : <CreateAccount />}
    </div>
  );
}

export default Home;
