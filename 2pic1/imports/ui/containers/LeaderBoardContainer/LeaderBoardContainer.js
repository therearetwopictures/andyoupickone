import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import LeaderBoard from "../../components/LeaderBoard";

export default class LeaderBoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostPopularImage: {},
      leastPopularImage: {},
      mostPopularComparison: {},
      closestToEvenSplit: {}
    };
  }
  getMostPopularImage() {
    Meteor.call("comparisons.getMostPopularImage", (error, result) => {
      if (error) {
        console.log(error.reason);
        return;
      }
      const url = result[0].A ? result[0].urlA : result[0].urlB;
      const count = result[0].A ? result[0].A : result[0].B;
      let query = {};
      query["url"] = url;
      query["count"] = count;
      this.setState({
        mostPopularImage: query
      });
    });
  }
  getLeastPopularImage() {
    Meteor.call("comparisons.getLeastPopularImage", (error, result) => {
      if (error) {
        console.log(error.reason);
        return;
      }
      const url = result[0].A ? result[0].urlA : result[0].urlB;
      const count = result[0].A ? result[0].A : result[0].B;
      let query = {};
      query["url"] = url;
      query["count"] = count;
      this.setState({
        leastPopularImage: query
      });
    });
  }
  getMostPopularComparison() {
    Meteor.call("comparisons.getMostPopularComparison", (error, result) => {
      if (error) {
        console.log(error.reason);
        return;
      }

      let query = {};
      query["urlA"] = result[0]._id.urlA;
      query["urlB"] = result[0]._id.urlB;
      query["count"] = result[0].totalAB;
      query["ACount"] = result[0]._id.A;
      query["BCount"] = result[0]._id.B;
      this.setState({ mostPopularComparison: query });
    });
  }
  getClosestToEvenSplit() {
    Meteor.call("comparisons.getEvenComparison", (error, result) => {
      if (error) {
        console.log(error.reason);
        return;
      }
      let query = {};
      query["urlA"] = result[0]._id.urlA;
      query["urlB"] = result[0]._id.urlB;
      query["count"] = result[0].sumAB;
      query["ACount"] = result[0]._id.A;
      query["BCount"] = result[0]._id.B;
      this.setState({ closestToEvenSplit: query });
    });
  }
  componentDidMount() {
    this.getMostPopularImage();
    this.getLeastPopularImage();
    this.getMostPopularComparison();
    this.getClosestToEvenSplit();
  }

  render() {
    return (
      <div>
        <LeaderBoard
          mostPopularImage={this.state.mostPopularImage}
          leastPopularImage={this.state.leastPopularImage}
          mostPopularComparison={this.state.mostPopularComparison}
          closestToEvenSplit={this.state.closestToEvenSplit}
        />
      </div>
    );
  }
}
