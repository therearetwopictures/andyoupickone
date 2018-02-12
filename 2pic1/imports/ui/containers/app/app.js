import Header from "../../components/header/header.js";
import Picture from "../../components/picture/picture.js";
import "../../../api/comparisons/comparisons";
import "../../../api/compMeta/compMeta";
import "isomorphic-fetch";
import { Meteor } from "meteor/meteor";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.imageQueue = [];
    this.state = {
      loading: true,
      urlA: "",
      urlB: "",
      _id: ""
    };
  }
  upload() {
    Meteor.call("comparisons.addOne");
  }
  handleClick(pick) {
    console.log(typeof this.state._id);
    Meteor.call("userData.updatePicks", this.state._id, pick);
    Meteor.call("compMeta.updatePicks", this.state._id, pick);
    try {
      this.addImageToQueue()
        .then(res => {
          console.log(this.imageQueue);
          this.imageQueue.shift();
          const { urlA, urlB, _id } = this.imageQueue[0];
          this.setState({ urlA, urlB, _id });
        })
        .catch(e => console.log(e, "handleclick"));
    } catch (e) {
      console.log(e, "error in click");
    }
  }
  addImageToQueue() {
    return new Promise((resolve, reject) => {
      Meteor.call("comparisons.getRandOne", (err, res) => {
        if (err) console.log(err);
        const { urlA, urlB, _id } = res[0];
        const fetchA = new Promise((res, rej) => {
          const imgA = new Image();
          imgA.src = urlA;
          imgA.onload = res();
          imgA.onerror = rej();
        });
        const fetchB = new Promise((res, rej) => {
          const imgB = new Image();
          imgB.src = urlB;
          imgB.onload = res();
          imgB.onerror = rej();
        });
        Promise.all([fetchA, fetchB])
          .then(res => {
            this.imageQueue.push({ urlA, urlB, _id });
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }
  componentDidMount() {
    addProms = [];
    for (let i = 0; i < 5; i++) {
      try {
        addProms.push(this.addImageToQueue());
      } catch (e) {
        console.log("error in mount");
      }
    }
    Promise.all(addProms)
      .then(res => {
        const { urlA, urlB, _id } = this.imageQueue[0];
        this.setState({ loading: false, urlA, urlB, _id });
      })
      .catch(e => console.log(e));
  }

  render() {
    return this.state.loading ? (
      <div>loading...</div>
    ) : (
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
