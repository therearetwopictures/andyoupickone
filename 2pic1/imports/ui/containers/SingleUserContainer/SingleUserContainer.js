import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import InsightsNavBar from "../../components/InsightsNavBar";
import UserData from "../../../api/userData/userData.js";
import Loading from "../../components/loading/";
import SingleUser from "../../components/SingleUser";
import PropTypes from "prop-types";

class SingleUserContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { loading, userData } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <SingleUser
          userId={userData[0]._id}
          numPicks={userData[0].picks.length}
        />
      </div>
    );
  }
}

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
