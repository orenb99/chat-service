import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

function SignIn() {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const errMessage = useRef();
  const passwordRef = useRef();
  const SignUpWithPassword = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailInput, passwordInput)
      .then((user) => {
        history.push("/profile");
      })
      .catch((err) => {
        errMessage.current.innerText = err.message;
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
      <h2 className="err-message" ref={errMessage}></h2>
    </div>
  );
}

export default SignIn;
