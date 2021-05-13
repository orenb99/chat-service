import React from "react";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

firebase.initializeApp({
  apiKey: "AIzaSyDhYQuJpWc6qSQ97xOnN8iRe87A2n2hBT8",
  authDomain: "chat-service-d13a1.firebaseapp.com",
  projectId: "chat-service-d13a1",
  storageBucket: "chat-service-d13a1.appspot.com",
  messagingSenderId: "159342168023",
  appId: "1:159342168023:web:7179420e149ec34c6aed92",
  measurementId: "G-P9NR879KPZ",
});
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  return <div>{user ? 1 : 2}</div>;
}

export default App;
