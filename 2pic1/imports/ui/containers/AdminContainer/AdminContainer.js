import { Meteor } from "meteor/meteor";
import React, { Component } from "react";
import { watsonBatchClassifyImages } from "./helpers";

export default class AdminContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="watson-functions-container">
        <h1>HELLLLLLO</h1>
        <button
          onClick={e => {
            e.preventDefault();
            watsonBatchClassifyImages();
          }}
        >
          Generate Tags
        </button>
      </div>
    );
  }
}