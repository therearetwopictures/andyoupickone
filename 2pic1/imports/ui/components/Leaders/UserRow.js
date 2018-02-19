import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import UserData from "../../../api/userData/userData";

class UserRow extends Component {
  constructor() {
    super();
    this.state = {
      _id: undefined,
      A: 0,
      B: 0,
      Aper: undefined,
      Bper: undefined,
      lastP: { pick: undefined, _id: undefined }
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.user) {
      const { A, B } = nextProps.user[0].picks.reduce(
        (acc, curr) => {
          curr.pick === "A" && acc.A++;
          curr.pick === "B" && acc.B++;
        },
        {
          A: 0,
          B: 0
        }
      );
      const newState = {
        _id: nextProps.user[0]._id,
        A,
        B,
        Aper: A / (A + B),
        Bper: B / (A + B),
        lastP: nextProps.user[0].picks[nextProps.user.picks.length - 1]
      };
      console.log(newState);
      this.setState({
        ...newState
      });
    }
  }
  render() {
    return (
      <li
        className={
          this.props.id === this.props.currentUserId
            ? "greenRow" && this.props.first && " salmonRow"
            : "lightgreyRow" && this.props.first && " salmonRow"
        }
      >
        <Link to={`/user/${this.props.id}`}>
          <span>{this.props.id}</span>
          <span>{this.state._id ? this.state.A : "loading..."}</span>
          <span>{this.state._id ? this.state.Aper : "loading..."}</span>
          <span>{this.state._id ? this.state.B : "loading..."}</span>
          <span>{this.state._id ? this.state.Bper : "loading..."}</span>
          {this.state._id ? (
            <span>
              {this.state.lastP.pick},{" "}
              <Link to={`/${this.state.lastP._id}`}>
                {this.state.lastP._id}
              </Link>
            </span>
          ) : (
            <span>loading...</span>
          )}
        </Link>
      </li>
    );
  }
}

export default withTracker(({ id }) => {
  Meteor.subscribe("userData.byUserId", id);
  return {
    user: UserData.find(id).fetch(),
    currentUserId: this.userId
  };
})(UserRow);
