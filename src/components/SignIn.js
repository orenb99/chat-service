import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";

function SignIn() {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setError] = useState();
  const passwordRef = useRef();
  const SignUpWithPassword = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailInput, passwordInput)
      .then(() => {
        history.push("/profile");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div className="sign-in">
      <h1 className="headline">Sign In</h1>
      <input
        name="text"
        placeholder="enter your email"
        onChange={(e) => {
          setEmailInput(e.target.value);
        }}
      />
      <br />
      <input
        name="password"
        type="password"
        placeholder="enter your password"
        ref={passwordRef}
        onChange={(e) => {
          setPasswordInput(e.target.value);
        }}
      />
      <button
        name="show-password"
        className="show-password"
        onMouseDown={() => {
          passwordRef.current.type = "text";
        }}
        onMouseUp={() => {
          passwordRef.current.type = "password";
        }}
        onMouseOut={() => {
          passwordRef.current.type = "password";
        }}
      >
        👁
      </button>
      <br />
      <button name="submit" onClick={SignUpWithPassword}>
        Enter
      </button>
      <div className="change">
        Doesn't have a user?
        <br />
        <Link to="/sign-up">Sign Up!</Link>
      </div>
      <h2 className="error-message">{errorMessage}</h2>
    </div>
  );
}

export default SignIn;
