import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
function Profile({ user }) {
  const [userData, setUserData] = useState();
  const history = useHistory();
  const db = firebase.firestore();
  const usersRef = db.collection("Users");
  const storage = firebase.storage();
  useEffect(() => {
    if (user) {
      const query = usersRef
        .where("email", "==", user.email)
        .get()
        .then((result) => {
          setUserData({ ...result.docs[0].data() });
        });
    }
  }, [user]);

  return (
    <div>
      <h1>Profile</h1>
      {userData && <img src={user.photoURL} className="profile-img" />}
      <br />
      <label for="username">your username</label>
      <input name="username" />
      <h1>{userData ? `Hello ${userData.username}` : "loading..."}</h1>
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
