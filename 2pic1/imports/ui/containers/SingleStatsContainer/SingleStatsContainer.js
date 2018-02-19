import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import SingleStat from "../../components/SingleStat";
import InsightsNavBar from "../../components/InsightsNavBar";
import Comparisons from "../../../api/comparisons/comparisons";
import Loading from "../../components/loading/";

class SingleStatsContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { loading, comparisons } = this.props;
    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <InsightsNavBar />
        <SingleStat
          urlA={comparisons[0].urlA}
          urlB={comparisons[0].urlB}
          pickedA={comparisons[0].A}
          pickedB={comparisons[0].B}
          id={comparisons[0]._id}
        />
      </div>
    );
  }
}

export default withTracker(props => {
  const results = Meteor.subscribe("comparisons.byCompId", props.compId);
  return {
    loading: !results.ready(),
    comparisons: Comparisons.find({}).fetch()
  };
})(SingleStatsContainer);
