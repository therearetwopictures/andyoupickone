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
  // getWatsonColorTags = () => {
  //   const colorRegex = /color/;
  //   this.props.comparisons.reduce((accu, comp) => {
  //     if (comp.tagsA) {
  //       let compATags = comp.tagsA.reduce((colorTags, tag) => {
  //         tagClass = tag.class;
  //         if (colorRegex.test(tagClass)) {
  //           let tagWords = tagClass.split(" ");
  //           if (tagWords[tagWords.length - 2] in colorTags) {
  //             colorTags[tagWords[tagWords.length - 2]]++;
  //           } else {
  //             colorTags[tagWords[tagWords.length - 2]] = 1;
  //           }
  //         }
  //         return colorTags;
  //       }, {});
  //       if (compATags in accu) {
  //       }
  //       console.log(compATags);
  //     }

  //     if (comp.tagsB) {
  //       comp.tagsB.forEach(() => {});
  //     }
  //     return accu;
  //   }, {});
  // };

  render() {
    // this.props.comparisons && this.getWatsonColorTags();
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
