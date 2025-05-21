import "../../styles/SignUp.css";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showPasswordInfo = () => {
    toast.info(
      "La password deve contenere almeno 8 caratteri, includere lettere maiuscole, numeri e simboli.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { background: "#333", color: "#fff" },
      }
    );
  };

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
        <h2 className="signupTitle">SIGN-UP</h2>
        <div className="passmailsignup">
          <h4 className="hmailsignup">email : </h4>
          <input
            className="inputEmail"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4 className="hpasswordsignup">
            password :{" "}
            <button className="spanPass" onClick={showPasswordInfo}>
              ℹ️
            </button>{" "}
          </h4>
          <div className="infoPass">
            <input
              className="inputPassword"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
