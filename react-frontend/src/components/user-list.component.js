import React, { Component } from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchEmail = this.onChangeSearchEmail.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchEmail = this.searchEmail.bind(this);

    this.state = {
      userList: [],
      currentUser: null,
      currentIndex: -1,
      searchEmail: "",
      message: ""
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  onChangeSearchEmail(e) {
    const searchEmail = e.target.value;
    this.setState({
      searchEmail: searchEmail
    });
  }

  loadUsers() {
    UserService.getAll()
      .then(response => {
        this.setState({
          userList: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.loadUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  removeAllUsers() {
    UserService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchEmail() {
    this.setState({
      currentUser: null,
      currentIndex: -1
    });

    UserService.findByEmail(this.state.searchEmail)
      .then(response => {
        this.setState({
          userList: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        this.loadUsers();
      });
  }

  render() {
    const { searchEmail, userList, currentUser, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by email"
              value={searchEmail}
              onChange={this.onChangeSearchEmail}
              onKeyUp={this.searchEmail}
            />
         
            <div className="input-group-append">
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={this.searchEmail}
              >Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users</h4>
          
          <ul className="list-group">
            {userList &&
              userList.map((usr, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(usr, index)}
                  key={index}
                >
                  <ul> <li className="list-group"> {usr.firstName}</li> </ul>
                  <ul> <li className="list-group">  {usr.lastName}</li></ul>
                  <ul> <li className="list-group">  {usr.email}</li></ul>
                  <ul><li className="list-group"> {usr.mobileNumber}</li></ul>
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >Delete All
          </button>
          <p>{this.state.message}</p>
        </div>
        <div className="col-md-6" >
          {currentUser ? (
            <div>
              <h4>Selected User</h4>
              <div>
                <label>
                  <strong>First Name:</strong>
                </label>{" "}
                {currentUser.firstName}
              </div>
              <div>
                <label>
                  <strong>Last Name:</strong>
                </label>{" "}
                {currentUser.lastName}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>Mobile Number:</strong>
                </label>{" "}
                {currentUser.mobileNumber}
              </div>
              <div>
              </div>
              <Link
                to={"/users/" + currentUser.id}
                className="btn btn-success m-3 btn btn-sm"
              >Update/Delete
              </Link>
            </div>
          ) : (
            <div>
            </div>
          )}
        </div>
      </div>
    );
  }
}