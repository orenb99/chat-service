import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
function Profile({ user }) {
  const history = useHistory();
  const db = firebase.firestore();
  const usersRef = db.collection("Users");
  const storage = firebase.storage();
  const editButton = useRef();
  const [editInput, setEditInput] = useState();
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (editing) editButton.current.innerText = "save";
    else editButton.current.innerText = "edit";
  }, [editing]);
  const editUsername = async () => {
    if (editing) {
      const regexp = /^[a-zA-Z0-9 ]*$/;
      if (!editInput || !editInput.match(regexp)) return;
      await user.updateProfile({ displayName: editInput });
    }
    setEditInput("");
    setEditing(!editing);
  };
  return (
    <div>
      <h1>Profile</h1>
      {user && <img src={user.photoURL} className="profile-img" />}
      <br />
      <label htmlFor="username">your username: </label>
      {editing ? (
        <input
          name="username"
          onChange={(e) => {
            setEditInput(e.target.value);
          }}
        />
      ) : (
        <strong name="username">{user ? user.displayName : "loading"}</strong>
      )}

      <button ref={editButton} onClick={editUsername}>
        edit
      </button>
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
