import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import InsightsNavBar from "../../components/InsightsNavBar";
import UserData from "../../../api/userData/userData";
import Loading from "../../components/loading/";
import SingleUser from "../../components/SingleUser";

const SingleUserContainer = ({ loading, userData }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <InsightsNavBar />
      <SingleUser
        userId={userData[0]._id}
        numPicks={userData[0].picks.length}
      />
    </div>
  );
};

SingleUserContainer.defaultProps = {
  loading: true,
  userData: []
};

SingleUserContainer.propTypes = {
  loading: PropTypes.bool,
  userData: PropTypes.array
};

export default withTracker(props => {
  const results = Meteor.subscribe("userData.byUserId", props.userId);
  return {
    loading: !results.ready(),
    userData: UserData.find({}).fetch()
  };
})(SingleUserContainer);
