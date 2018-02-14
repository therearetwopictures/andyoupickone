import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import LeaderBoard from "../../components/LeaderBoard";

export default class LeaderBoardContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <LeaderBoard />
      </div>
    );
  }
}
