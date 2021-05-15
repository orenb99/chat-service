import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
function Profile({ user }) {
  const history = useHistory();
  const db = firebase.firestore();
  const usersRef = db.collection("Users");
  const storage = firebase.storage();

  return (
    <div>
      <h1>Profile</h1>
      {user && <img src={user.photoURL} className="profile-img" />}
      <br />
      <label htmlFor="username">your username</label>
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
