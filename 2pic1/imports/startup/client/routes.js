import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppComponent from "../../ui/containers/app/app.js";
import AdminContainer from "../../ui/containers/AdminContainer";
import StatsContainer from "../../ui/containers/StatsContainer/";
import StatsPage from "../../ui/components/StatsPage/";

export default Meteor.startup(() => {
  AccountsAnonymous.login();
  Meteor.call("userData.createUserSession");

  render(
    <Router>
      <div>
        <Switch>
          {" "}
          <Route exact path="/" component={AppComponent} />
          <Route
            exact
            path="/totally-not-an-admin-page"
            component={AdminContainer}
          />
          <Route
            exact
            path="/:compId"
            render={({ match }) => (
              <AppComponent compId={match.params.compId} />
            )}
          />
          <Route exact path="/stats" render={StatsContainer} />
          <Route exact path="stats/:compId" render={StatsPage} />
          <Route path="/#/reset-pasword/:hash" render={reset} />
        </Switch>
      </div>
    </Router>,

    document.getElementById("app")
  );
});
