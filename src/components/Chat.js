import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Message from "./Message";
function Chat({ user, chatId, username }) {
  const db = firebase.firestore();
  const chatsRef = db.collection("Chats");
  const [textInput, setTextInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!textInput) return;
    await chatsRef.add({
      content: textInput,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      username: username,
    });
  };
  return chatId && user ? (
    <div className="chat">
      <div className="messages"></div>
      <div className="texting">
        <input
          name="text"
          onChange={(e) => {
            setTextInput(e.target.innerText);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  ) : (
    <h1>no chat chosen</h1>
  );
}

export default Chat;
