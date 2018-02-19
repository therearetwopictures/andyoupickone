import React from "react";

const SingleStat = ({ urlA, urlB, pickedA, pickedB, id }) => {
  return (
    <div className="container">
      <div className="header">
        <h1>Comparison </h1>
      </div>
      <h2>{id}</h2>
      <div className="item">
        <div className="goat-picture-wrapper">
          <img src={urlA} />
          <div className="desc">
            Picked {pickedA} {pickedA > 1 ? "times" : "time"}
          </div>
        </div>
        <div className="goat-picture-wrapper">
          <img src={urlB} />
          <div className="desc">
            Picked {pickedB} {pickedB > 1 ? "times" : "time"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStat;
