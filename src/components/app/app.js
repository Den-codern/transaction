import React,{Component} from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { autoLogin } from "../../actions";
import { compose } from "../../utils";
import Layout from "../layout";
import Logout from "../logout";

import { AuthPage, DashboardPage, HomePage } from "../pages";

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/" exact component={HomePage} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/transaction-creator" component={DashboardPage} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated:!!state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default compose(withRouter, connect(mapStateToProps,mapDispatchToProps))(App);
