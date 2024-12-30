import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { toast } from "react-toastify";
import "../../styles/Menu.css";
import Home from "../../assets/home.png";
import Logout from "../../assets/log-out.png";
import CreaScheda from "../../assets/addscheda.png";

function Menu(props) {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const onLogout = () => {
    localStorage.removeItem("AuthToken");
    navigate("/entry");
    setAuth(false);
    toast.success("You have logged Out!");
  };

  const handleCreateScheda = () => {
    navigate("/create-scheda");
  };
  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className="divLogCre">
      <button className="buttonHome" type="button" onClick={goToHome}>
        <img className="imma" src={Home} alt="Home" />
      </button>
      <button
        className="buttonCreaScheda"
        type="button"
        onClick={handleCreateScheda}
      >
        <img className="imma" src={CreaScheda} alt="Crea Scheda" />
      </button>
      <button className="buttonLogout" type="button" onClick={onLogout}>
        <img className="imma" src={Logout} alt="Logout" />
      </button>
    </div>
  );
}

export default Menu;
