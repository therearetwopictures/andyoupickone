import React from "react";

const SingleUser = ({ userId, numPicks }) => {
  return (
    <div className="container">
      <h2>User Id: {userId}</h2>
      <h2>Number of Picks: {numPicks}</h2>
    </div>
  );
};

export default SingleUser;
