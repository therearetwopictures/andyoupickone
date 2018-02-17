import Header from "../../components/header/header.js";
import Picture from "../../components/picture/picture.js";
import "../../../api/comparisons/comparisons";
import "isomorphic-fetch";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import Loading from "../../components/loading/";
import React, { Component } from "react";
import Sound from "react-sound";
import Route from "react-router-dom/Route";
soundManager.setup({ debugMode: false });

class App extends Component {
  constructor(props) {
    super(props);
    this.imageQueue = [];
    this.bodyEl = document.getElementById("body");
    this.state = {
      loading: true,
      urlA: "",
      urlB: "",
      _id: "",
      hasSeen: null,
      leaderMp3: false
    };
  }

  handleClick(pick) {
    if (this.state.hasSeen) {
      if (
        (pick === "A" && this.state.hasSeen === "B") ||
        (pick === "B" && this.state.hasSeen === "A")
      ) {
        alert(
          "This is 2pic1, not 2pic2. \nLet this be a lesson, you can change your mind.. \nbut not your past."
        );
      }
    } else {
      Meteor.call("userData.updatePicks", this.state._id, pick);
      Meteor.call("comparisons.updatePicks", this.state._id, pick);
    }

    try {
      this.addImageToQueue()
        .then(res => {
          const { urlA, urlB, _id } = this.imageQueue[0];

          if (_id !== this.state._id)
            this.setState({ loading: false, urlA, urlB, _id, hasSeen: null });
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
      this.setState({ loading: false, urlA, urlB, _id, hasSeen: null });
      this.props.history.replace(`/${_id}`);
    } else {
      this.imageQueue.shift();
      this.setState({ loading: true, hasSeen: null });
    }
    Meteor.call("userData.getLeader", (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      if (res[0].isLeader) {
        Meteor.call("comparisons.addOne");
        console.log("leader of the pack!");
        if (!this.state.leaderMp3) {
          this.setState({ leaderMp3: true });
          this.bodyEl.setAttribute("class", "leaderOfThePack");
        }
      } else {
        this.setState({ leaderMp3: false });
      }
    });

    // if (Meteor.call(""))
  }
  addImageToQueue(compId = null) {
    return new Promise((resolve, reject) => {
      Meteor.call(
        compId ? "comparisons.getByCompId" : "comparisons.getRandOne",
        compId,
        (err, res) => {
          if (err) reject(err);
          if (compId && !res[0])
            reject(new Error("comparison in url not found"));
          const { urlA, urlB, _id, hasSeen } = res[0];
          if (this.imageQueue.map(obj => obj._id).includes(_id)) {
            this.addImageToQueue();
            reject(new Error("already in the queue"));
          } else {
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
                compId
                  ? this.imageQueue.unshift({ urlA, urlB, _id, hasSeen })
                  : this.imageQueue.push({ urlA, urlB, _id });
                resolve(res);
              })
              .catch(err => {
                Meteor.call("comparisons.flagError", _id);
                this.addImageToQueue();
                reject(err);
              });
          }
        }
      );
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
        const { urlA, urlB, _id, hasSeen } = this.imageQueue[0];
        this.props.history.replace(`/${_id}`);

        if (_id !== this.state._id)
          this.setState({ loading: false, urlA, urlB, _id, hasSeen });
      })
      .catch(e => {
        console.log(e);
        if (!this.imageQueue.length) {
          let tryCount = 1;
          const to = () =>
            setTimeout(() => {
              if (!this.imageQueue.length && tryCount < 11) {
                to();
                tryCount++;
              } else {
                const { urlA, urlB, _id, hasSeen } = this.imageQueue[0];
                if (_id !== this.state._id)
                  this.setState({ loading: false, urlA, urlB, _id, hasSeen });
              }
            }, 500);
          to();
        } else {
          const { urlA, urlB, _id, hasSeen } = this.imageQueue[0];
          if (_id !== this.state._id)
            this.setState({ loading: false, urlA, urlB, _id, hasSeen });
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
        {this.state.leaderMp3 && (
          <Sound
            playStatus={Sound.status.PLAYING}
            url="./leader-of-the-pack.mp3"
            loop
            autoPlay
          />
        )}

        <div className="picture-wrapper">
          <Picture
            url={this.state.urlA}
            pick="A"
            handleClick={this.handleClick.bind(this)}
          />
          <Picture
            url={this.state.urlB}
            pick="B"
            handleClick={this.handleClick.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
