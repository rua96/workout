/*import logo from "./logo.svg";
import "./App.css";
import CreateAccount from "./pages/components/CreateAccount";
import SignUp from "./pages/components/SignUp";
import Login from "./pages/components/Login";

function App() {
  return <CreateAccount />;
}

export default App;
*/

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./logo.svg";
import "./App.css";
import SignUp from "./pages/components/SignUp";
import Login from "./pages/components/Login";
import CreateAccount from "./pages/components/CreateAccount";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const changeToSignUp = () => setIsLogin(false);
  const changeToLogin = () => setIsLogin(true);

  return (
    <>
      <div className="App">
        {isLogin ? (
          <Login changeToSignUp={changeToSignUp} />
        ) : (
          <SignUp changeToLogin={changeToLogin} />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
