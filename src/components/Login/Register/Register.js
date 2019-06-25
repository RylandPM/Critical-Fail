import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { requestUserData } from "../../../dux/userReducer";
import axios from "axios";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      redirect: false
    };
    this.register = this.register.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(prop, inp) {
    console.log(this.state, inp);
    this.setState({
      [prop]: inp
    });
  }

  register() {
    axios
      .post("/auth/register", this.state)
      .then(() => {
        axios.post("/auth/login", this.state).then(() => {
          this.props.requestUserData();
          this.setState({
            redirect: true
          });
        });
      })
      .catch(err => {
        console.log(err);
        alert("Registration failed, please try again");
      });
  }

  render() {
    console.log(this.state);
    if (this.state.redirect === true) {
      return <Redirect to="/dash" />;
    }
    return (
      <div className="registration">
        <div>
          <h2>Registration</h2>
          <div>
            <h3>Username: </h3>
            <input
              onChange={e => {
                this.changeHandler("username", e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Email: </h3>
            <input
              onChange={e => {
                this.changeHandler("email", e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Password: </h3>
            <input
              onChange={e => {
                this.changeHandler("password", e.target.value);
              }}
              type="password"
            />
          </div>
          <button onClick={() => this.register()}>Register</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  requestUserData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
