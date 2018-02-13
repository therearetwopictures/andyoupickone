import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import AccountsUIWrapper from "../../components/AccountsUIWrapper";

export default class AdminContainer extends Component {
  constructor(props) {
    super(props);
  }
  generateImageTagsOnClick = () => {};
  render() {
    return (
      <div className="watson-functions-container">
        <h1>HELLLLLLO</h1>
        <button>Generate Tags</button>
      </div>
    );
  }
}
