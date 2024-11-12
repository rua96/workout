import "../../styles/SignUp.css";
import React from "react";

function SignUp() {
  return (
    <div className="signUpContainer">
      <h1 className="mainTitle">WORKOUT</h1>
      <div className="signUpCard">
        <h2 className="signupTitle">
          <img src={require("../../assets/logo.png")} alt="Logo" />
          SIGN-UP
        </h2>
        <div className="passmailsignup">
          <h4 className="hmailpassword">email : </h4>
          <input
            className="inputEmail"
            type="text"
            placeholder="Email o Username"
          />
          <h4 className="hmailpassword">password : </h4>
          <input
            className="inputPassword"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="buttonSignUp" type="submit">
          SIGN UP
        </button>
        <p className="alreadyAccount">
          Hai già un account?
          <button className="buttonEffettuaLogin" type="button">
            Effettua il Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
