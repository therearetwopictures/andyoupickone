import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppComponent from "../../ui/containers/app/app.js";
import AdminContainer from "../../ui/containers/AdminContainer";
import Reset from "../../ui/components/reset";
import StatsContainer from "../../ui/containers/StatsContainer/";
import SingleStatsContainer from "../../ui/containers/SingleStatsContainer/";
import SingleUserContainer from "../../ui/containers/UserContainer/";
import GoatContainer from "../../ui/containers/GoatContainer/";
import LeaderBoardContainer from "../../ui/containers/LeadersContainer/";

export default Meteor.startup(() => {
  AccountsAnonymous.login();
  Meteor.call("userData.createUserSession");

  render(
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/totally-not-an-admin-page"
            component={AdminContainer}
          />
          <Route exact path="/goat" component={GoatContainer} />
          <Route exact path="/stats" component={StatsContainer} />
          <Route exact path="/leaders" component={LeaderBoardContainer} />
          <Route exact path="/reset-password/:token" component={Reset} />
          <Route
            exact
            path="/stats/:compId"
            render={({ match }) => (
              <SingleStatsContainer compId={match.params.compId} />
            )}
          />
          <Route
            exact
            path="/user/:userId"
            render={({ match }) => (
              <SingleUserContainer userId={match.params.userId} />
            )}
          />
          <Route
            exact
            path="/:compId"
            render={({ match }) => (
              <AppComponent compId={match.params.compId} />
            )}
          />
          <Route exact path="/" component={AppComponent} />
        </Switch>
      </div>
    </Router>,

    document.getElementById("app")
  );
});
