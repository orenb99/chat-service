import React, { useState, useRef } from "react";
import firebase from "firebase";
import { useHistory, Link } from "react-router-dom";
function SignUp() {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setError] = useState();
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
          .set({ email: emailData }, { merge: true })
          .then(() => {
            history.push("/");
          })
          .catch((err) => {
            setError(err.message);
          });
      });
  };
  const SignUpWithPassword = () => {
    const provider = firebase
      .auth()
      .createUserWithEmailAndPassword(emailInput, passwordInput)
      .then((user) => {
        const currentUser = firebase.auth().currentUser;
        currentUser
          .updateProfile({
            displayName: "user" + currentUser.uid,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/chat-service-d13a1.appspot.com/o/user-icon.png?alt=media&token=d7d79030-4cde-4d4a-b4bb-73684808bd66",
          })
          .then(async () => {
            const users = await db.collection("Users");
            users
              .doc(user.user.email)
              .set({ email: user.user.email, chats: [] });
            history.push("/");
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((err) => setError(err.message));
  };
  return (
    <div className="sign-up">
      <h1 className="headline">Sign Up</h1>
      <button name="google" onClick={SignUpWithGoogle} className="google">
        <img src="https://firebasestorage.googleapis.com/v0/b/chat-service-d13a1.appspot.com/o/google-logo.png?alt=media&token=47d2d019-037d-418c-abef-230317fe1393" />
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
        Register
      </button>
      <div className="change">
        Already have a user?
        <br />
        <Link to="/sign-in">Sign In!</Link>
      </div>
      <h2 className="error-message">{errorMessage}</h2>
    </div>
  );
}

export default SignUp;
