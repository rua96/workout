import "../../styles/CreateAccount.css";
import React from "react";

function CreateAccount() {
  return (
    <div className="CreateAccountContainer">
      <h1 className="mainTitle">WORKOUT</h1>
      <div className="CreateAccountCard">
        <h2 className="CreateAccountTitle">
          <img src={require("../../assets/logo.png")} alt="Logo" />
          CREATE ACCOUNT
        </h2>

        <h4 className="husername"> Create Username : </h4>
        <input
          className="inputusernameCreate"
          type="text"
          placeholder="Username"
        />
        <div className="divDati">
          <div className="wrapper">
            <h4 className="hnomeCreate">nome : </h4>
            <input className="inputName" type="text" placeholder="Nome" />
          </div>
          <div className="wrapper">
            <h4 className="hnomeCreate">cognome : </h4>
            <input className="inputName" type="text" placeholder="Cognome" />
          </div>
        </div>
        <div className="divDati">
          <div className="wrapper">
            <h4 className="hnomeCreate">peso : </h4>
            <input className="inputName" type="text" placeholder="Peso" />
          </div>
          <div className="wrapper">
            <h4 className="hnomeCreate">altezza : </h4>
            <input className="inputName" type="text" placeholder="Altezza" />
          </div>
        </div>
        <div className="divDati">
          <div className="wrapper">
            <h4 className="hnomeCreate">sesso : </h4>
            <input className="inputName" type="text" placeholder="Sesso" />
          </div>
          <div className="wrapper">
            <h4 className="hnomeCreate">livello allenamento : </h4>
            <input className="inputName" type="text" placeholder="Livello" />
          </div>
        </div>
        <button className="buttonCreateAccount" type="submit">
          CREATE
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;
