import React from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
function Profile({ user }) {
  console.log(user);
  const history = useHistory();
  const db = firebase.firestore();
  const postsRef = db.collection("Users");
  const query = postsRef.get().then((results) => {
    console.log(results.docs[0].data());
  });
  return (
    <div>
      <h1>Profile</h1>
      <label for="username">your username</label>
      <input name="username" />
      <h1>{user ? `Hello ${user.displayName}` : "loading..."}</h1>
      <button
        name="Logout"
        onClick={() => {
          firebase.auth().signOut();
          history.push("/sign-up");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
