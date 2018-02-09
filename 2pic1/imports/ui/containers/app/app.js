import Header from "../../components/header/header.js";
import Picture from "../../components/picture/picture.js";

import React, { Component } from "react";

export default class home extends Component {
  constructor(props) {
    super(props);
  }
  upload() {
    Meteor.call("comparisons.upload");
  }

  render() {
    return (
      <div>
        <Header />
        <Picture />
        <button
          onClick={() => {
            this.upload();
          }}
        >
          upload
        </button>
      </div>
    );
  }
}
