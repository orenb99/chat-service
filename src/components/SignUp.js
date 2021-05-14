import React, { useState, useRef } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
function SignUp() {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const errMessage = useRef();
  const passwordRef = useRef();
  const db = firebase.firestore();
  const SignUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (data) => {
        const emailData = data.user.email;
        const userData = data.user.displayName;
        const users = await db.collection("Users");
        users
          .doc(emailData)
          .set({ email: emailData, username: userData }, { merge: true })
          .then(() => {
            history.push("/");
          })
          .catch((err) => {
            errMessage.current.innerText = err.message;
          });
      });
  };
  const SignUpWithPassword = () => {
    const provider = firebase
      .auth()
      .createUserWithEmailAndPassword(emailInput, passwordInput)
      .then(async (user) => {
        const users = await db.collection("Users");
        users
          .doc(user.user.email)
          .set(
            { email: user.user.email, username: "user", chats: [] },
            { merge: true }
          );
        history.push("/");
      })
      .catch((err) => {
        errMessage.current.innerText = err.message;
      });
  };
  return (
    <div>
      <h1>sign up</h1>
      <button name="google" onClick={SignUpWithGoogle}>
        Sign up with google
      </button>
      <br />
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
        show password
      </button>
      <br />
      <button name="submit" onClick={SignUpWithPassword}>
        Register
      </button>
      <h2 className="err-message" ref={errMessage}></h2>
    </div>
  );
}

export default SignUp;
