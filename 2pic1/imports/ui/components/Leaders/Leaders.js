import React from "react";
import UserRow from "./UserRow";

const Leaders = ({ userIds }) => (
  <ol className="leaders-wrapper">
    <li>
      <span style={{ fontWeight: 500 }}>user id</span>
      <span style={{ fontWeight: 500 }}>left</span>
      <span style={{ fontWeight: 500 }}>right</span>
      <span style={{ fontWeight: 500 }}>left %</span>
      <span style={{ fontWeight: 500 }}>right %</span>
      <span style={{ fontWeight: 500 }}>last pick</span>
    </li>
    {userIds.map(user => <UserRow key={user._id} id={user._id} />)}
  </ol>
);

export default Leaders;
