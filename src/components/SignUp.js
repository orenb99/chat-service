import React from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
function SignUp() {
  const history = useHistory();

  const SignUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (data) => {
        const emailData = data.user.email;
        const userData = data.user.displayName;
        const db = firebase.firestore();
        const user = await db
          .collection("Users")
          .doc(emailData)
          .set({ email: emailData, username: userData }, { merge: true })
          .then((result) => {
            history.push("/");
            return result;
          })
          .catch((err) => console.log(err));
      });
  };
  const SignUp = () => {};
  return (
    <div>
      <h1>sign up</h1>
      <button name="google" onClick={SignUpWithGoogle}>
        Sign up with google
      </button>
      <br />
      <input name="text" placeholder="enter your email" />
      <br />
      <input name="password" placeholder="enter your password" />
      <br />
      <button name="submit">Enter</button>
    </div>
  );
}

export default SignUp;
