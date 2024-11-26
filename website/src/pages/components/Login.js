import "../../styles/Login.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Validation from "../../services/Validation";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";

function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onLogin = async (e) => {
    e.preventDefault();

    console.log("data", id, password);

    if (!id) {
      toast.success("put your email or username");
      return;
    }

    if (!password) {
      toast.success("put your password");
      return;
    }

    let response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/users/login",
      {
        ...(Validation.isEmail(id) ? { email: id } : { username: id }),
        password: password,
      }
    );
    if (response?.data?.error) {
      toast.error(response.data.error);
    } else if (response?.data?.status) {
      setAuth({
        email: response?.data?.email,
        username: response?.data?.username,
        livello: response?.data?.livello,
      });
      localStorage.setItem("AuthToken", response?.data?.authToken);
      navigate("/home");
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="mainTitle">WORKOUT</h1>
      <div className="loginCard">
        <h2 className="loginTitle">
          <img src={require("../../assets/logo.png")} alt="Logo" />
          LOGIN
        </h2>
        <div className="mailogin">
          <h4 className="hmaillogin">email o username : </h4>
          <input
            className="inputEmail"
            type="text"
            placeholder="Email o Username"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="passwordlogin">
          <h4 className="hpasswordlogin">password : </h4>
          <input
            className="inputPassword"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <h4 className="forgotPassword">Password dimenticata? </h4>
        </div>
        <button className="buttonLogin" onClick={onLogin}>
          LOGIN
        </button>
        <p className="notalreadyAccount">
          Non hai ancora un account?
          <button
            className="buttonIscriviti"
            type="button"
            onClick={() => props.changeToSignUp()}
          >
            Iscriviti
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
