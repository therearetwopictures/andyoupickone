import React, { Component } from "react";

const LeaderBoard = () => {
  return (
    <div>
      <h1>The Leader Board</h1>
      <div>
        <p>
          {" "}
          Most Clicked Image:
          <button
            onClick={e => {
              e.preventDefault();
              Meteor.call("comparisons.getMostPopularImage", function(
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
        <p> Closest to Even Split: </p>
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
        <p> Least Popular Image: </p>
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
        <p> User with Most Picks: </p>
        <p>
          {" "}
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
