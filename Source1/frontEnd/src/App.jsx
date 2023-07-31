import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import CreateUser from "./components/CreateUser";
import Donation from "./components/Donation";
import Devotees from "./components/Devotees";
import Payonline from "./components/Payonline";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/adminPage" element={<Admin />}></Route>
        <Route path="/devoteesPage" element={<Devotees />}></Route>
        <Route path="/createUser" element={<CreateUser />}></Route>
        <Route path="/donation" element={<Donation />}></Route>
        <Route path="/payonline" element={<Payonline />}></Route>
      </Routes>
    </>
  );
}

export default App;
