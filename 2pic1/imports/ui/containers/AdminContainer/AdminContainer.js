import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { watsonBatchClassifyImages } from "./helpers";
import AccountsUIWrapper from "../../components/AccountsUIWrapper";
import { Accounts } from "meteor/accounts-base";
import { LoginBox } from "meteor/universe:accounts-ui";
import { withTracker } from "meteor/react-meteor-data";
import "./styles.css";

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    state: {
      newAdminEmail: "";
      password: "";
      show: false;
    }
  }

  toggleShowPasswordForm = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    console.log(this.user);
    const isAdmin =
      this.props.currentUser && this.props.currentUser.role === "admin";
    return (
      <div>
        <div className="login-box">
          <LoginBox />
        </div>
        {isAdmin ? (
          <div className="watson-functions-container">
            <h1>Administration Station</h1>
            <button
              onClick={e => {
                e.preventDefault();
                Meteor.call("comparisons.classifyImage");
              }}
            >
              Generate Tags
            </button>
            <h2>Create up new admin</h2>
            <form>
              <input
                placeholder="Email"
                type="email"
                onChange={e => {
                  this.setState({ newAdminEmail: e.target.value });
                }}
              />
              <input
                placeholder="Password"
                type="password"
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
              <button
                onClick={e => {
                  e.preventDefault();
                  let newAdmin = Accounts.createUser({
                    email: this.state.newAdminEmail,
                    password: this.state.password
                  });
                  Accounts.sendVerificationEmail(newAdmin);
                }}
              >
                New Admin User
              </button>
            </form>
            <button
              onClick={e => {
                e.preventDefault();
                // userEmail = Meteor.user().emails[0].address;
                // Accounts.forgotPassword({ email: userEmail });
              }}
            >
              Change Password
            </button>
          </div>
        ) : (
          <div>
            <p>Log in as an Admin ya goober</p>
          </div>
        )}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("admin");
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId()
  };
})(AdminContainer);
