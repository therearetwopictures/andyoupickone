import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Leaders from "../../components/Leaders";
import CurrentUser from "../../components/CurrentUser";
import InsightsNavBar from "../../components/InsightsNavBar";
import UserData from "../../../api/userData/userData";

class LeadersContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <InsightsNavBar />
        <h1 className="header">Leaders of the Pack!</h1>
        <Leaders userIds={this.props.userIds} />
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("userData.allIdOnly");
  return {
    userIds: UserData.find({}, { fields: { _id: 1 } }).fetch()
  };
})(LeadersContainer);
