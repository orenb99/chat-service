import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { useParams } from "react-router";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ConfirmInvite({ user }) {
  const db = firebase.firestore();
  const chatsRef = db.collection("Chats");
  const errorMessage = useRef();
  const usersRef = db.collection("Users");
  const linkParam = useParams().link;
  const [password, setPassword] = useState();
  const [valid, setValid] = useState(true);
  const [link, loading] = useCollectionData(
    chatsRef.where("link", "==", linkParam)
  );
  useEffect(() => {
    if (!loading && !link[0] && user) {
      errorMessage.current.innerText = "Invalid Link";
      setValid(false);
    }
  }, [loading]);

  const confirmPassword = () => {
    if (password !== link[0].password) {
      errorMessage.current.innerText = "Incorrect password";
      return;
    }
    errorMessage.current.innerText = "Valid password";
  };
  return (
    <div>
      {user && valid && (
        <>
          <label htmlFor="password">Confirm password</label>
          <br />
          <input
            name="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={confirmPassword}>confirm</button>
        </>
      )}
      <h1 ref={errorMessage} class="err-message">
        {!user && "User not connected"}
      </h1>
    </div>
  );
}

export default ConfirmInvite;
