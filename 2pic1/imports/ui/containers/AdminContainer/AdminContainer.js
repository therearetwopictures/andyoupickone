import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { watsonBatchClassifyImages } from "./helpers";
import AccountsUIWrapper from "../../components/AccountsUIWrapper";
import { ComboBox } from "meteor/universe:accounts-ui";
import LeaderBoardContainer from "../LeaderBoardContainer/LeaderBoardContainer.js";

export default class AdminContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ComboBox />
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
      </div>
    );
  }
}
