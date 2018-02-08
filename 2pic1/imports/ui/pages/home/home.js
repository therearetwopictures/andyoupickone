import "./home.html";

import "../../components/header/header.js";
import "../../components/picture/picture.js";

console.log(
  Meteor.call("dictionary.generateSeedWords", function(err, res) {
    console.log(res);
  })
);
