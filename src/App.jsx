import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Layout } from 'antd';
import devices from './components/devices/devices';
import deviceDetails from './components/DeviceDetails';
import * as ROUTES from './constants/routes';
import SignInPage from './components/SignIn';
import LogoutButton from './components/LogoutButton'
import { withAuthentication, AuthUserContext } from './components/Session';

const { Header, Footer } = Layout;

//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Router>
            <React.Fragment>
              {/* <NavBar /> */}
              <Header className="header">
                {authUser && <LogoutButton />}
              </Header>
              <Switch>
                < Redirect exact path="/" to={ROUTES.DEVICES} />
                < Route exact path={ROUTES.DEVICES} component={devices} />
                < Route path={`${ROUTES.DEVICES}/:id`} component={deviceDetails} />
                < Route path={ROUTES.SIGN_IN} component={SignInPage} />

              </Switch>
              <Footer style={{ textAlign: 'center' }}>Livneh-IOT ©2019</Footer>
            </React.Fragment>
          </Router>

        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withAuthentication(App);
