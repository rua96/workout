import "../../styles/Login.css";
import React from "react";

function Login() {
  return (
    <div className="loginContainer">
      <h1 className="mainTitle">WORKOUT</h1>
      <div className="loginCard">
        <h2 className="loginTitle">
          <img src={require("../../assets/logo.png")} alt="Logo" />
          LOGIN
        </h2>
        <div className="mailogin">
          <h4 className="hmailpassword">email o username : </h4>
          <input
            className="inputEmail"
            type="text"
            placeholder="Email o Username"
          />
        </div>
        <div className="passwordlogin">
          <h4 className="hmailpassword">password : </h4>
          <input
            className="inputPassword"
            type="password"
            placeholder="Password"
          />
          <h4 className="forgotPassword">Password dimenticata? </h4>
        </div>
        <button className="buttonLogin" type="submit">
          SIGN UP
        </button>
        <p className="notalreadyAccount">
          Non hai ancora un account?
          <button className="buttonIscriviti" type="button">
            Iscriviti
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
