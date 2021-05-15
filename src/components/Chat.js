import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
function Chat({ user, chatId }) {
  const db = firebase.firestore();
  const chatsRef = db.collection("Chats");
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef();
  const [messages, setMessages] = useState([]);
  async function getMessages() {
    const snapshot = await chatsRef
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(25)
      .get();
    if (!snapshot) return;
    let dataToPass = [];
    snapshot.forEach((doc) => dataToPass.unshift(doc.data()));
    setMessages(dataToPass);
  }
  useEffect(() => {
    getMessages();
  }, [chatId]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!textInput) return;
    const message = {
      content: textInput,
      createdAt: new Date().toLocaleTimeString("it-IT"),
      username: user.displayName,
      image: user.photoURL,
    };
    let dataToPass = [...messages];
    dataToPass.push(message);
    chatsRef
      .doc(chatId)
      .collection("messages")
      .add(message)
      .then(() => {
        console.log("send");
        getMessages();
        inputRef.current.value = "";
        setTextInput("");
        inputRef.current.focus();
      });
  };
  return chatId && user ? (
    <div className="chat">
      <div className="messages">
        {messages &&
          messages.map((value, index) => (
            <Message
              current={user}
              username={value.username}
              time={value.createdAt}
              content={value.content}
              image={value.image}
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
