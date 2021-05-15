import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
import randomstring from "randomstring";
function Chat({ user, chatId }) {
  const db = firebase.firestore();
  const chatsRef = db.collection("Chats");
  const messagesRef = chatsRef.doc(chatId).collection("messages");
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef();
  const [messages, loadingMessages] = useCollectionData(
    messagesRef.limit(14).orderBy("createdAt", "desc")
  );
  const linkRef = useRef();
  const passwordRef = useRef();
  const divRef = useRef();

  const generateLink = (e) => {
    e.preventDefault();
    const rndLink = randomstring.generate(15);
    const rndPassword = randomstring.generate(10);
    divRef.current.hidden = false;
    linkRef.current.value = "http://localhost:3000/invite/" + rndLink;
    passwordRef.current.value = rndPassword;
    linkRef.current.select();
    document.execCommand("copy");
    chatsRef
      .doc(chatId)
      .set({ link: rndLink, password: rndPassword }, { merge: true });
    setTimeout(() => {
      divRef.current.hidden = true;
      chatsRef.doc(chatId).set({ link: "", password: "" }, { merge: true });
    }, 300000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!textInput) return;
    const message = {
      content: textInput,
      createdAt: new Date().toLocaleTimeString("it-IT"),
      username: user.displayName,
      image: user.photoURL,
      email: user.email,
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
      <button onClick={generateLink} hidden={false}>
        generate invitation link
      </button>
      <div className="link-handler" ref={divRef} hidden={true}>
        <input name="link" ref={linkRef} className="link-input" />
        <label htmlFor="link">invite link</label>
        <br />
        <input name="password" ref={passwordRef} className="password-input" />
        <label htmlFor="password">password</label>
        <br />
      </div>
      <div className="messages">
        {!loadingMessages &&
          messages.map((value, index, array) => (
            <Message
              current={user}
              username={array[array.length - index - 1].username}
              email={array[array.length - index - 1].email}
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
