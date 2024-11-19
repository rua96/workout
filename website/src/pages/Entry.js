import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function Entry() {
  const [entryState, setEntryState] = useState(false);

  if (entryState) return <Login changeToSignUp={() => setEntryState(false)} />;

  return <SignUp changeToLogin={() => setEntryState(true)} />;
}

export default Entry;
