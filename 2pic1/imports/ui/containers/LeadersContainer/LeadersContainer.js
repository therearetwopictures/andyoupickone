import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import LeaderBoard from "../../components/Leaders";
import CurrentUser from "../../components/CurrentUser";
import InsightsNavBar from "../../components/InsightsNavBar";

export default class LeadersContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <InsightsNavBar />
        <CurrentUser />
        <Leaders />
      </div>
    );
  }
}
