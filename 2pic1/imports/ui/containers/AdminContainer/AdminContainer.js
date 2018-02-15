import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { watsonBatchClassifyImages } from "./helpers";
import AccountsUIWrapper from "../../components/AccountsUIWrapper";
import { LoginBox } from "meteor/universe:accounts-ui";
import { withTracker } from "meteor/react-meteor-data";
import LeaderBoardContainer from "../LeaderBoardContainer/LeaderBoardContainer.js";

class AdminContainer extends Component {
  constructor(props) {
    super(props);
  }

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
            <h1>HELLLLLLO</h1>
            <button
              onClick={e => {
                e.preventDefault();
                Meteor.call("comparisons.classifyImage");
              }}
            >
              Generate Tags
            </button>
            <LeaderBoardContainer />
            <button>Generate Tags</button>
          </div>
        ) : (
          <div>
            <p>Log in ya goober</p>
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
