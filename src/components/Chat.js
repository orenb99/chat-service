import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
function Chat({ user, chatId }) {
  const db = firebase.firestore();
  const chatsRef = db.collection("Chats");
  const messagesRef = chatsRef.doc(chatId).collection("messages");
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef();
  const [messages, loadingMessages] = useCollectionData(
    messagesRef.limit(14).orderBy("createdAt", "desc")
  );
  const sendMessage = (e) => {
    e.preventDefault();
    if (!textInput) return;
    const message = {
      content: textInput,
      createdAt: new Date().toLocaleTimeString("it-IT"),
      username: user.displayName,
      image: user.photoURL,
    };
    chatsRef
      .doc(chatId)
      .collection("messages")
      .add(message)
      .then(() => {
        console.log("send");
        inputRef.current.value = "";
        setTextInput("");
        inputRef.current.focus();
      });
  };
  return chatId && user ? (
    <div className="chat">
      <div className="messages">
        {!loadingMessages &&
          messages.map((value, index, array) => (
            <Message
              current={user}
              username={array[array.length - index - 1].username}
              time={array[array.length - index - 1].createdAt}
              content={array[array.length - index - 1].content}
              image={array[array.length - index - 1].image}
              key={index}
            />
          ))}
      </div>
      <div className="texting">
        <input
          name="text"
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
          ref={inputRef}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  ) : (
    <h1>no chat chosen</h1>
  );
}

export default Chat;
