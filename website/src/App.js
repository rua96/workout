import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
import Entry from "./pages/Entry";
import Menu from "./pages/components/Menu";
import CreateScheda from "./pages/components/CreateScheda";
import { AuthContext } from "./services/AuthContext";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRoute } from "./services/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("AuthToken")) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  async function checkAuth() {
    let response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/users/auth",
      {
        headers: {
          authToken: localStorage.getItem("AuthToken"),
        },
      }
    );

    if (response?.data?.error) {
      toast.error(response.data.error);
    } else if (response?.data?.user) {
      setAuth(response?.data?.user);
    }

    setLoading(false);
  }

  if (loading) {
    return <></>;
  }

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Router>
          <Routes>
            <Route path="/entry" element={<Entry />} />
            <Route path="/home" element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/menu" element={<Menu />} />
            <Route path="/create-scheda" element={<CreateScheda />} />
            <Route path="*" element={<Entry />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
