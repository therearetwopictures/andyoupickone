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
      total: undefined,
      lastP: { pick: undefined, comparisonId: undefined }
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.user &&
      nextProps.user[0] &&
      (this.state.A + this.state.B === 0 ||
        (nextProps.user[0].picks &&
          nextProps.user[0].picks[nextProps.user[0].picks.length - 1]
            .comparisonId !== this.state.lastP.comparisonId))
    ) {
      const { A, B } = nextProps.user[0].picks
        ? nextProps.user[0].picks.reduce(
            (acc, curr) => {
              if (curr.pick === "A") acc.A = acc.A + 1;
              if (curr.pick === "B") acc.B = acc.B + 1;
              return acc;
            },
            {
              A: 0,
              B: 0
            }
          )
        : {
            A: 0,
            B: 0
          };
      const lastP = nextProps.user[0].picks
        ? nextProps.user[0].picks[nextProps.user[0].picks.length - 1]
        : { pick: "", comparisonId: "" };
      const newState = {
        _id: nextProps.user[0]._id,
        A,
        B,
        Aper: A / (A + B),
        Bper: B / (A + B),
        total: A + B,
        lastP
      };
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
            ? `greenRow ${this.props.first && " salmonRow"}`
            : `lightgreyRow ${this.props.first && " salmonRow"}`
        }
      >
        <Link to={`/user/${this.props.id}`}>
          <span>
            {this.props.id}{" "}
            {this.props.id === this.props.currentUserId ? "~YOU~" : ""}
          </span>
        </Link>
        <span>{this.state._id ? this.state.A : "loading..."}</span>
        <span>
          {this.state._id
            ? `${(this.state.Aper * 100).toString().substring(0, 4)}%`
            : "loading..."}
        </span>
        <span>{this.state._id ? this.state.B : "loading..."}</span>
        <span>
          {this.state._id
            ? `${(this.state.Bper * 100).toString().substring(0, 4)}%`
            : "loading..."}
        </span>
        <span>{this.state._id ? this.state.total : "loading..."}</span>
        {this.state._id ? (
          <span>
            {this.state.lastP.pick},{" "}
            <Link to={`/${this.state.lastP.comparisonId}`}>
              {this.state.lastP.comparisonId}
            </Link>
          </span>
        ) : (
          <span>loading...</span>
        )}
      </li>
    );
  }
}

export default withTracker(({ id }) => {
  Meteor.subscribe("userData.byUserId", id);
  return {
    user: UserData.find(id).fetch(),
    currentUserId: Meteor.userId()
  };
})(UserRow);
