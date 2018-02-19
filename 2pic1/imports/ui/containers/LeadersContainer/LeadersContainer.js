import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Leaders from "../../components/Leaders";
import Loading from "../../components/loading/";
import CurrentUser from "../../components/CurrentUser";
import InsightsNavBar from "../../components/InsightsNavBar";
import UserData from "../../../api/userData/userData";

class LeadersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIds: [],
      sortBy: "total",
      loading: true
    };
    this.handleSort = this.handleSort.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userIds && nextProps.userIds.length) {
      this.handleSort(this.state.sortBy, nextProps.userIds);
    }
  }
  sortByTotal(a, b) {
    const { aA, aB } = a.picks
      ? a.picks.reduce(
          (acc, curr) => {
            if (curr.pick === "A") acc.aA = acc.aA + 1;
            if (curr.pick === "B") acc.aB = acc.aB + 1;
            return acc;
          },
          {
            aA: 0,
            aB: 0
          }
        )
      : {
          aA: 0,
          aB: 0
        };
    const { bA, bB } = b.picks
      ? b.picks.reduce(
          (acc, curr) => {
            if (curr.pick === "A") acc.bA = acc.bA + 1;
            if (curr.pick === "B") acc.bB = acc.bB + 1;
            return acc;
          },
          {
            bA: 0,
            bB: 0
          }
        )
      : {
          bA: 0,
          bB: 0
        };
    return bA + bB - (aA + aB);
  }

  handleSort(sortBy, users) {
    let sortedIds = users;
    switch (sortBy) {
      case "total": {
        sortedIds.sort(this.sortByTotal);
        break;
      }
      default: {
        sortedIds.sort(this.sortByTotal);
      }
    }
    sortedIds[0].first = true;
    this.setState({ userIds: sortedIds, sortBy, loading: false });
  }
  render() {
    return (
      <div>
        <InsightsNavBar />
        <h1 className="header">Leaders of the Pack!</h1>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Leaders userIds={this.state.userIds} />
        )}
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("userData.allIdOnly");
  return {
    userIds: UserData.find({}, { fields: { _id: 1, picks: 1 } }).fetch()
  };
})(LeadersContainer);
