import React from "react";
import PropTypes from "prop-types";

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
            Picked {pickedA} {pickedA !== 1 ? "times" : "time"}
          </div>
        </div>
        <div className="goat-picture-wrapper">
          <img src={urlB} />
          <div className="desc">
            Picked {pickedB} {pickedB !== 1 ? "times" : "time"}
          </div>
        </div>
      </div>
    </div>
  );
};

SingleStat.defaultProps = {
  urlA: "",
  urlB: "",
  pickedA: 0,
  pickedB: 0,
  id: ""
};

SingleStat.propTypes = {
  urlA: PropTypes.string,
  urlB: PropTypes.string,
  pickedA: PropTypes.number,
  pickedB: PropTypes.number,
  id: PropTypes.string
};

export default SingleStat;
