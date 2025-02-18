import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from "./create-user.component";
import User from "./edit-user.component";
import UserList from "./user-list.component";

const NavHeader = () => (
  <div className="NavHeader">
   <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top navbar-inverse">
        <Link to={"/users"} className="navbar-brand m-3" activeClassName="active">
          React-spring-boot
        </Link>
        <div className="navbar-nav mr-auto" activeClassName="active">
          <li className="nav-item">
            <Link to={"/users"} className="nav-link">
              Users
            </Link>
          </li>
          <li className="navbar-nav mr-auto" activeClassName="active">
            <Link to={"/createuser"} className="nav-link">
              Create User
            </Link>
          </li>
        </div>
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div class="navbar-nav">
                <a href="#" class="nav-item nav-link active">About</a>
                <a href="#" class="nav-item nav-link">Profile</a>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Options</a>
                    <div class="dropdown-menu">
          
                    </div>
                </div>
                <a href="#" class="nav-item nav-link active">Login</a>
                </div>
            </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
  </div>
);

export default NavHeader;
