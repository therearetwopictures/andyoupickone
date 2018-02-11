import Header from "../../components/header/header.js";
import Picture from "../../components/picture/picture.js";
import "../../../api/comparisons/comparisons";
import "../../../api/compMeta/compMeta";
import { Meteor } from "meteor/meteor";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlA: "",
      urlB: "",
      _id: ""
    };
  }
  upload() {
    // Meteor.call("comparisons.upload");
  }
  handleClick(pick) {
    console.log(typeof this.state._id);
    Meteor.call("userData.updatePicks", this.state._id, pick);
    Meteor.call("compMeta.updatePicks", this.state._id, pick);
    Meteor.call("comparisons.getRandOne", (err, res) => {
      if (err) console.log(err);
      const { urlA, urlB, _id } = res[0];
      this.setState({ urlA, urlB, _id });
    });
  }
  componentDidMount() {
    Meteor.call("comparisons.getRandOne", (err, res) => {
      if (err) console.log(err);
      const { urlA, urlB, _id } = res[0];
      this.setState({ urlA, urlB, _id });
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
