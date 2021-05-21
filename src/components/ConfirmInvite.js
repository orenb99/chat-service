import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { useParams } from "react-router";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ConfirmInvite({ user }) {
  const db = firebase.firestore();
  const chatsRef = db.collection("Chats");
  const [errorMessage, setError] = useState();
  const usersRef = db.collection("Users");
  const linkParam = useParams().link;
  const [password, setPassword] = useState();
  const [valid, setValid] = useState(true);
  const history = useHistory();
  const [chatInfo, loading] = useCollectionData(
    chatsRef.where("link", "==", linkParam)
  );
  useEffect(() => {
    if (!loading && user) {
      if (!chatInfo[0]) {
        setError("Invalid Link");
        setValid(false);
      } else if (chatInfo[0].users.includes(user.email)) {
        setError("User already in this chat");
        setValid(false);
      }
    }
  }, [loading, chatInfo]);

  const confirmPassword = async () => {
    if (password !== chatInfo[0].password) {
      setError("Incorrect password");
      return;
    }
    let updatedChats = await usersRef.where("email", "==", user.email).get();
    updatedChats = updatedChats.docs[0].data().chats;
    updatedChats.push(chatInfo[0].chatId);

    let updatedUsers = await chatsRef
      .where("chatId", "==", chatInfo[0].chatId)
      .get();
    updatedUsers = updatedUsers.docs[0].data().users;
    updatedUsers.push(user.email);
    usersRef.doc(user.email).set({ chats: updatedChats }, { merge: true });
    chatsRef
      .doc(chatInfo[0].chatId)
      .set({ users: updatedUsers }, { merge: true });
    history.push("/chat");
  };
  return (
    <div className="confirm-page">
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
      <h1 className="error-message">
        {user ? errorMessage : "User not connected"}
      </h1>
    </div>
  );
}

export default ConfirmInvite;
