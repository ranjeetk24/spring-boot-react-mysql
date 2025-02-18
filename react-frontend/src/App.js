
import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CreateUser from "./components/create-user.component";
import User from "./components/edit-user.component";
import UserList from "./components/user-list.component";
import NavHeader from "./components/nav-header.component";

function App() {
  return (
    <div className="App">
      <NavHeader></NavHeader>
    </div>
  );
}

export default App;
