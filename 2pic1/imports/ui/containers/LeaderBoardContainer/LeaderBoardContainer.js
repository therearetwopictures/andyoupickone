import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import LeaderBoard from "../../components/LeaderBoard";

export default class LeaderBoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostPopularImage: {}
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
  componentDidMount() {
    getMostPopularImage();
  }

  render() {
    return (
      <div>
        <LeaderBoard mostPopularImage={this.state.mostPopularImage} />
      </div>
    );
  }
}
