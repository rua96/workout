import "../../styles/SignUp.css";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();

    console.log(email, password);

    let response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/users",
      {
        email: email,
        password: password,
      }
    );
    if (response?.data?.error) {
      toast.error(response.data.error);
    } else {
      toast.success("Utente Creato!");
    }
  };

  return (
    <div className="signUpContainer">
      <h1 className="mainTitle">WORKOUT</h1>
      <div className="signUpCard">
        <h2 className="signupTitle">
          <img src={require("../../assets/logo.png")} alt="Logo" />
          SIGN-UP
        </h2>
        <div className="passmailsignup">
          <h4 className="hmailsignup">email : </h4>
          <input
            className="inputEmail"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4 className="hpasswordsignup">password : </h4>
          <input
            className="inputPassword"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="buttonSignUp" onClick={onSignUp}>
          SIGN UP
        </button>
        <p className="alreadyAccount">
          Hai già un account?
          <button
            className="buttonEffettuaLogin"
            type="button"
            onClick={() => props.changeToLogin()}
          >
            Effettua il Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
