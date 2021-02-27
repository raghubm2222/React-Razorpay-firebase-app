import React from "react";
import AppRouter from "../Router/Router";
import { AuthProvider } from "../../Context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
