import Header from "../../components/header/header.js";
import Picture from "../../components/picture/picture.js";
import "../../../api/comparisons/comparisons";
import { Meteor } from "meteor/meteor";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlA: "",
      urlB: ""
    };
  }
  upload() {
    // Meteor.call("comparisons.upload");
  }
  handleClick() {
    Meteor.call("comparisons.getRandOne", (err, res) => {
      if (err) throw err;
      const { urlA, urlB } = res[0];
      this.setState({ urlA, urlB });
    });
  }
  componentDidMount() {
    Meteor.call("comparisons.getRandOne", (err, res) => {
      if (err) throw err;
      const { urlA, urlB } = res[0];
      this.setState({ urlA, urlB });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Picture
          urlA={this.state.urlA}
          urlB={this.state.urlB}
          handleClick={this.handleClick.bind(this)}
        />
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
