import Header from "../../components/header/header.js";
import Picture from "../../components/picture/picture.js";
import "../../../api/comparisons/comparisons";
import "../../../api/compMeta/compMeta";
import "isomorphic-fetch";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import Loading from "../../components/loading/";

import React, { Component } from "react";

class App extends Component {
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

  handleClick(pick) {
    console.log(this.imageQueue.length);
    Meteor.call("userData.updatePicks", this.state._id, pick);
    Meteor.call("compMeta.updatePicks", this.state._id, pick);

    try {
      this.addImageToQueue()
        .then(res => {
          const { urlA, urlB, _id } = this.imageQueue[0];
          this.props.history.push(`/${this.state._id}`);
          if (_id !== this.state._id)
            this.setState({ loading: false, urlA, urlB, _id });
        })
        .catch(e => {
          console.log(e, "handleclick");
        });
    } catch (e) {
      console.log(e, "error in click");
    }
    if (this.imageQueue.length > 1) {
      this.imageQueue.shift();
      const { urlA, urlB, _id } = this.imageQueue[0];
      this.setState({ loading: false, urlA, urlB, _id });
    } else {
      this.imageQueue.shift();
      this.setState({ loading: true });
    }
  }
  addImageToQueue(compId = null) {
    return compId
      ? new Promise((resolve, reject) => {
          Meteor.call("comparisons.getByCompId", compId, (err, res) => {
            if (err) reject(err);
            if (!res[0]) reject(new Error("comparison in url not found"));
            const { urlA, urlB, _id } = res[0];
            const fetchA = new Promise((res, rej) => {
              const imgA = new Image();
              imgA.onload = () => {
                res("resolved-A");
              };
              imgA.onerror = () => {
                rej(new Error("rejected-A"));
              };
              imgA.src = urlA;
            });
            const fetchB = new Promise((res, rej) => {
              const imgB = new Image();
              imgB.onload = () => {
                res("resolved-B");
              };
              imgB.onerror = () => {
                rej(new Error("rejected-B"));
              };
              imgB.src = urlB;
            });
            Promise.all([fetchA, fetchB])
              .then(res => {
                this.imageQueue.unshift({ urlA, urlB, _id });
                resolve(res);
              })
              .catch(err => {
                this.addImageToQueue();
                reject(err);
              });
          });
        })
      : new Promise((resolve, reject) => {
          Meteor.call("comparisons.getRandOne", (err, res) => {
            if (err) reject(err);
            const { urlA, urlB, _id } = res[0];
            const fetchA = new Promise((res, rej) => {
              const imgA = new Image();
              imgA.onload = () => {
                res("resolved-A");
              };
              imgA.onerror = () => {
                rej(new Error("rejected-A"));
              };
              imgA.src = urlA;
            });
            const fetchB = new Promise((res, rej) => {
              const imgB = new Image();
              imgB.onload = () => {
                res("resolved-B");
              };
              imgB.onerror = () => {
                rej(new Error("rejected-B"));
              };
              imgB.src = urlB;
            });
            Promise.all([fetchA, fetchB])
              .then(res => {
                this.imageQueue.push({ urlA, urlB, _id });
                resolve(res);
              })
              .catch(err => {
                this.addImageToQueue();
                reject(err);
              });
          });
        });
  }
  componentDidMount() {
    const addProms = [];
    try {
      addProms.push(this.addImageToQueue(this.props.compId));
    } catch (e) {
      console.log(e, "error in mount");
    }
    for (let i = 0; i < 5; i++) {
      try {
        addProms.push(this.addImageToQueue());
      } catch (e) {
        console.log(e, "error in mount");
      }
    }
    Promise.all(addProms)
      .then(res => {
        const { urlA, urlB, _id } = this.imageQueue[0];
        this.props.history.replace(`/${_id}`);

        if (_id !== this.state._id)
          this.setState({ loading: false, urlA, urlB, _id });
      })
      .catch(e => {
        console.log(e);
        if (this.imageQueue.length) {
          const { urlA, urlB, _id } = this.imageQueue[0];
          if (_id !== this.state._id)
            this.setState({ loading: false, urlA, urlB, _id });
        }
      });
  }

  render() {
    return this.state.loading ? (
      <div>
        <Loading />
      </div>
    ) : (
      <div>
        <Header />
        <Picture
          urlA={this.state.urlA}
          urlB={this.state.urlB}
          handleClick={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}

export default withRouter(App);
