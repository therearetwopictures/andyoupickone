import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Stats from "../../components/Stats";
import ScatterPlot from "../../components/ScatterPlot";
import InsightsNavBar from "../../components/InsightsNavBar";
import Comparisons from "../../../api/comparisons/comparisons";
import GridFlasher from "../../components/GridFlasher";

class StatsContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <InsightsNavBar />
        <h1 className="header">Stats!</h1>
        <Stats />
        <ScatterPlot />
        <GridFlasher comps={this.props.comparisons} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("comparisons.all");
  return {
    comparisons: Comparisons.find({}, { fields: { _id: 1 } }).fetch()
  };
})(StatsContainer);
