import React, { Component } from "react";
import "./styles.css";

const LeaderBoard = props => {
  return (
    <div className="flex-container">
      <h1>GOAT</h1>
      <div className="flex-item">
        <h1>Most Popular Image:</h1>
        <p>Selected {props.mostPopularImage.count} times</p>
        <img src={props.mostPopularImage.url} />
      </div>
      <div className="flex-item">
        <p>
          {" "}
          Closest to Even Split:
          <button
            onClick={e => {
              e.preventDefault();
              Meteor.call("comparisons.getEvenComparison", function(
                error,
                result
              ) {
                if (error) {
                  console.log(error.reason);
                  return;
                }
                console.log(result);
              });
            }}
          >
            Find Out!
          </button>
        </p>
      </div>
      <div className="flex-item">
        <p>
          {" "}
          Least Popular Image:
          <button
            onClick={e => {
              e.preventDefault();
              Meteor.call("comparisons.getLeastPopularImage", function(
                error,
                result
              ) {
                if (error) {
                  console.log(error.reason);
                  return;
                }
                console.log(result);
              });
            }}
          >
            Find Out!
          </button>
        </p>
      </div>
      <div className="flex-item">
        <p>
          {" "}
          Most Viewed Comparison:
          <button
            onClick={e => {
              e.preventDefault();
              Meteor.call("comparisons.getMostPopularComparison", function(
                error,
                result
              ) {
                if (error) {
                  console.log(error.reason);
                  return;
                }
                console.log(result);
              });
            }}
          >
            Find Out!
          </button>
        </p>
      </div>
      <div className="flex-item">
        <p>
          {" "}
          Average Session Time:
          <button
            onClick={e => {
              e.preventDefault();
              Meteor.call("userData.averageSessionTime", function(
                error,
                result
              ) {
                if (error) {
                  console.log(error.reason);
                  return;
                }
                console.log(result);
              });
            }}
          >
            Find Out!
          </button>
        </p>
      </div>
      <div className="flex-item">
        <p>
          {" "}
          Longest Session Time:
          <button
            onClick={e => {
              e.preventDefault();
              Meteor.call("userData.longestSessionTime", function(
                error,
                result
              ) {
                if (error) {
                  console.log(error.reason);
                  return;
                }
                console.log(result);
              });
            }}
          >
            Find Out!
          </button>
        </p>
      </div>
      <div className="flex-item">
        <p>
          User with Most Picks:
          <button
            onClick={e => {
              e.preventDefault();
              Meteor.call("userData.getLeader", function(error, result) {
                if (error) {
                  console.log(error.reason);
                  return;
                }
                console.log(result);
              });
            }}
          >
            Find Out!
          </button>
        </p>
      </div>
      <div className="flex-item">
        <p>
          UserId with Most Sessions:
          <button
            onClick={e => {
              e.preventDefault();
              Meteor.call("userData.userWithMostSessions", function(
                error,
                result
              ) {
                if (error) {
                  console.log(error.reason);
                  return;
                }
                console.log(result);
              });
            }}
          >
            Find Out!
          </button>
        </p>
      </div>
    </div>
  );
};
export default LeaderBoard;
