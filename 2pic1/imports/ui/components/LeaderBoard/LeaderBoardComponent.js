import React, { Component } from "react";
import "./styles.css";

const LeaderBoard = props => {
  return (
    <div className="flex-container">
      <h1>GOAT</h1>
      <div className="flex-item">
        <h1>Most Popular Image:</h1>
        <p>
          Picked {props.mostPopularImage.count}{" "}
          {props.mostPopularImage.count > 1 ? "times" : "time"}
        </p>
        <div className="picture">
          <img src={props.mostPopularImage.url} />
        </div>
      </div>
      <div className="flex-item">
        <h1>Least Popular Image:</h1>
        <p>
          Picked {props.leastPopularImage.count}{" "}
          {props.leastPopularImage.count > 1 ? "times" : "time"}
        </p>
        <div className="picture">
          <img src={props.leastPopularImage.url} />
        </div>
      </div>
      <div className="flex-item">
        <h1>Most Viewed Comparison:</h1>
        <p>
          Viewed {props.mostPopularComparison.count}{" "}
          {props.mostPopularComparison.count > 1 ? "times" : "time"}
        </p>
        <div className="picture-wrapper">
          Picked {props.mostPopularComparison.ACount}{" "}
          {props.mostPopularComparison.ACount > 1 ? "times" : "time"}
          <div className="picture">
            <img src={props.mostPopularComparison.urlA} />
          </div>
          Picked {props.mostPopularComparison.BCount}{" "}
          {props.mostPopularComparison.BCount > 1 ? "times" : "time"}
          <div className="picture">
            <img src={props.mostPopularComparison.urlB} />
          </div>
        </div>
      </div>
      <div className="flex-item">
        <h1>Most Contentious Comparison:</h1>
        <p>
          Viewed {props.closestToEvenSplit.count}{" "}
          {props.closestToEvenSplit.count > 1 ? "times" : "time"}
        </p>
        <div className="picture-wrapper">
          Picked {props.closestToEvenSplit.ACount}{" "}
          {props.closestToEvenSplit.ACount > 1 ? "times" : "time"}
          <div className="picture">
            <img src={props.closestToEvenSplit.urlA} />
          </div>
          Picked {props.closestToEvenSplit.BCount}{" "}
          {props.closestToEvenSplit.BCount > 1 ? "times" : "time"}
          <div className="picture">
            <img src={props.closestToEvenSplit.urlB} />
          </div>
        </div>
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
