import React from "react";
import UserRow from "./UserRow";
import PropTypes from "prop-types";
import "./styles.css";

const Leaders = ({ userIds }) => (
  <ol className="leaders-wrapper">
    <li>
      <span className="leader-board-heading">user id</span>
      <span className="leader-board-heading">left</span>
      <span className="leader-board-heading">left %</span>
      <span className="leader-board-heading">right</span>
      <span className="leader-board-heading">right %</span>
      <span className="leader-board-heading">total</span>
      <span className="leader-board-heading">last pick</span>
    </li>
    {userIds.map(user => (
      <UserRow key={user._id} id={user._id} first={user.first} />
    ))}
  </ol>
);

Leaders.defaultProps = {
  userIds: []
};

Leaders.propTypes = {
  userIds: PropTypes.array
};

export default Leaders;
