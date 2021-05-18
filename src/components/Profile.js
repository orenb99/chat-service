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
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (editing) editButton.current.innerText = "save";
    else editButton.current.innerText = "edit";
  }, [editing]);

  useEffect(() => {
    if (user) setImageUrl(user.photoURL);
  }, [user]);

  const editUsername = async () => {
    if (editing) {
      const regexp = /^[a-zA-Z0-9 ]*$/;
      if (!editInput || !editInput.match(regexp) || editInput.length > 40)
        return;
      await user.updateProfile({ displayName: editInput });
    }
    setEditInput("");
    setEditing(!editing);
  };

  const editPicture = async () => {
    if (!imageFile) return;
    await storage.ref(imageFile.name).put(imageFile);
    storage
      .ref()
      .child(imageFile.name)
      .getDownloadURL()
      .then(async (url) => {
        setImageUrl(url);
        await user.updateProfile({ photoURL: url });
      });
  };
  return (
    <div className="profile">
      <h1 className="headline">Profile</h1>
      {user && <img src={imageUrl} className="profile-img" />}
      <br />
      <input
        type="file"
        onChange={(e) => {
          setImageFile(e.target.files[0]);
        }}
      />
      <button onClick={editPicture}>save</button>
      <br />
      <label className="username" htmlFor="username">
        Your username:{" "}
      </label>
      {editing ? (
        <input
          name="username"
          onChange={(e) => {
            setEditInput(e.target.value);
          }}
        />
      ) : (
        <strong className="username" name="username">
          {user ? user.displayName : "loading"}
        </strong>
      )}

      <button ref={editButton} onClick={editUsername}>
        edit
      </button>
      <br />
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
