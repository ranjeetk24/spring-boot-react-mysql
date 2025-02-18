import React, { Component } from "react";
import UserService from "../services/user.service";
import { withRouter } from '../common/with-router';

class User extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMobileNumber = this.onChangeMobileNumber.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.router.params.id);
  }

  onChangeFirstName(e) {
    const firstName = e.target.value;

    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        firstName: firstName
      }
    }));
  }

  onChangeLastName(e) {
    const lastName = e.target.value;
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        lastName: lastName
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }

  onChangeMobileNumber(e) {
    const mobileNumber = e.target.value;
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        mobileNumber: mobileNumber
      }
    }));
  }

  getUser(id) {
    UserService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "User Details Updated Successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {
    UserService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/users');
        this.setState({
          message: "User Deleted Successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={currentUser.firstName}
                  onChange={this.onChangeFirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={currentUser.lastName}
                  onChange={this.onChangeLastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobileNumber"
                  value={currentUser.mobileNumber}
                  onChange={this.onChangeMobileNumber}
                />
              </div>
            </form>
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.deleteUser}>Delete
            </button>
              
            <button
              type="submit"
              className="m-3 btn btn-sm  btn-success"
              onClick={this.updateUser}>Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select User...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(User);