import React from "react";
import "./App.css";
import MyReads from "./Components/MyReads.js";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <MyReads />
      </BrowserRouter>
    </div>
  );
}

export default App;
