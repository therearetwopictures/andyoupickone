import React from "react";
import PropTypes from "prop-types";

const SingleUser = ({ userId, numPicks }) => {
  return (
    <div className="container">
      <h2>User Id: {userId}</h2>
      <h2>Number of Picks: {numPicks}</h2>
    </div>
  );
};

SingleUser.defaultProps = {
  userId: "",
  numPicks: 0
};

SingleUser.propTypes = {
  userId: PropTypes.string,
  numPicks: PropTypes.number
};

export default SingleUser;
