import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppComponent from "../../ui/containers/app/app.js";
import AdminContainer from "../../ui/containers/AdminContainer";

export default Meteor.startup(() => {
  AccountsAnonymous.login();
  Meteor.call("userData.createUserSession");
  // Meteor.call("comparisons.addOne");
  // Meteor.call(
  //   "compMeta.classifyImage",
  //   "434u3eCWXcRJgmQRv",
  //   "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1437660869i/23745753._UY500_SS500_.jpg",
  //   "http://www.artitude.eu/immagini/news/3-1307111909274.jpg"
  // );

  // Meteor.call("comparisons.getRandOne");

  render(
    <Router>
      <div>
        <Switch>
          {" "}
          <Route exact path="/" component={AppComponent} />
          <Route
            exact
            path="/:compId"
            render={({ match }) => (
              <AppComponent compId={match.params.compId} />
            )}
          />
          <Route exact parth="/admin" component={AdminContainer} />
        </Switch>
      </div>
    </Router>,

    document.getElementById("app")
  );
});
