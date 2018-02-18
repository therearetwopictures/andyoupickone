import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppComponent from "../../ui/containers/app/app.js";
import AdminContainer from "../../ui/containers/AdminContainer";
import Reset from "../../ui/components/reset";
import StatsContainer from "../../ui/containers/StatsContainer/";
import StatsPage from "../../ui/components/StatsPage/";
import LeaderBoardContainer from "../../ui/containers/LeaderBoardContainer/";

export default Meteor.startup(() => {
  AccountsAnonymous.login();
  Meteor.call("userData.createUserSession");

  render(
    <Router>
      <div>
        <Switch>
          {" "}
          <Route
            exact
            path="/totally-not-an-admin-page"
            component={AdminContainer}
          />
          <Route exact path="/goat" component={LeaderBoardContainer} />
          <Route
            exact
            path="/:compId"
            render={({ match }) => (
              <AppComponent compId={match.params.compId} />
            )}
          />
          <Route exact path="/stats" component={StatsContainer} />
          <Route exact path="stats/:compId" component={StatsPage} />
          <Route path="/reset-password/:token" component={Reset} />
          <Route exact path="/" component={AppComponent} />
        </Switch>
      </div>
    </Router>,

    document.getElementById("app")
  );
});
