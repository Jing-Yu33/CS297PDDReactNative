import "react-native-gesture-handler";
import React from "react";

import Auth from "./nav/auth/Auth";
import Initializing from "./nav/Initializing";
// import MainNav from "./nav/main/MainNav";
import HomeScreen from "./nav/auth/HomeScreen";

import { ThemeProvider } from "./contexts/ThemeContext";
import Amplify, { Auth as AmplifyAuth, Hub } from "aws-amplify";
import Storage from "@aws-amplify/storage";
import * as WebBrowser from "expo-web-browser";
import awsConfig from "./src/aws-exports";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './reducers'

Amplify.configure(awsConfig);
AmplifyAuth.configure(awsConfig);

Storage.configure({
  AWSS3: {
    bucket: "dev-origin-report-images",
    region: "us-west-2",
  },
});

class App extends React.Component {
  state = {
    currentView: "initializing",
  };

  async componentDidMount() {
    //await AmplifyAuth.signOut();
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log("user is signed in");
          this.setState({ currentView: "mainNav" });
          break;
        case "signOut":
          this.setState({ currentView: "LoginOptions" });
          break;
        default:
          console.log("APP :: default hit Event - " + event + "  data - " + JSON.stringify(data)) ;
          // this.setState({ customState: data });
      }
    });

    this.checkAuth();

  }
  updateAuth = (currentView) => {
    this.setState({ currentView });
  };
  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser();
      console.log("user is signed in");
      this.setState({ currentView: "mainNav" });
    } catch (err) {
      console.log("user is not signed in");
      //this.setState({ currentView: "LoginOptions" });
      this.setState({ currentView: "LoginOptions" });
    }
  };
  render() {
    const { currentView } = this.state;
    const store = createStore(allReducers);
    console.log("currentView: ", currentView);
    return (
      <Provider store={store}>
      <ThemeProvider>
        {currentView === "initializing" && <Initializing />}
        {currentView === "auth" && <Auth updateAuth={this.updateAuth} />}
        {currentView === "LoginOptions" && (
          <HomeScreen updateAuth={this.updateAuth} />
        )}
        {currentView === "mainNav" && <MainNav updateAuth={this.updateAuth} />}
      </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
