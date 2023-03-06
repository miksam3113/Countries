import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import React from "react";
import Country from "./pages/Country/Country";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/country/:name" element={<Country />} />
      </Routes>
    </Router>
  );
}

export default App;
