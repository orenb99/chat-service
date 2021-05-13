import React from "react";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";

const firebaseConfig = {
  apiKey: "AIzaSyDhYQuJpWc6qSQ97xOnN8iRe87A2n2hBT8",
  authDomain: "chat-service-d13a1.firebaseapp.com",
  projectId: "chat-service-d13a1",
  storageBucket: "chat-service-d13a1.appspot.com",
  messagingSenderId: "159342168023",
  appId: "1:159342168023:web:7179420e149ec34c6aed92",
  measurementId: "G-P9NR879KPZ",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <Switch>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
          <Route exact path="/sign-up">
            <SignUp user={user} />
          </Route>
          <Route exact path="/">
            <Profile user={user} />
          </Route>
          <Route exact path="/Chat" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
