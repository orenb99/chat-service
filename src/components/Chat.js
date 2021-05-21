import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Message from "./Message";
import randomstring from "randomstring";
function Chat({ user, chatId }) {
  const db = firebase.firestore();
  const chatsRef = db.collection("Chats");
  const messagesRef = chatsRef.doc(chatId).collection("messages");
  const [chatData] = useCollectionData(chatsRef.where("chatId", "==", chatId));
  const [textInput, setTextInput] = useState("");
  const inputRef = useRef();
  const scroll = useRef();
  const [messages, loadingMessages] = useCollectionData(
    messagesRef.limit(14).orderBy("createdAt", "desc")
  );
  const origin = window.location.origin;
  const linkRef = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    if (chatData) {
      linkRef.current.value = chatData[0].link
        ? origin + "/invite/" + chatData[0].link
        : "";
      passwordRef.current.value = chatData[0].password
        ? chatData[0].password
        : "";
      linkRef.current.select();
      document.execCommand("copy");
    }
  }, [chatData]);
  const generateLink = (e) => {
    e.preventDefault();
    const rndLink = randomstring.generate(15);
    const rndPassword = randomstring.generate(10);
    chatsRef
      .doc(chatId)
      .set({ link: rndLink, password: rndPassword }, { merge: true });
    setTimeout(() => {
      chatsRef.doc(chatId).set({ link: "", password: "" }, { merge: true });
    }, 300000);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!textInput) return;
    const message = {
      content: textInput,
      createdAt: new Date(),
      username: user.displayName,
      image: user.photoURL,
      email: user.email,
    };
    chatsRef
      .doc(chatId)
      .collection("messages")
      .add(message)
      .then(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
        inputRef.current.value = "";
        setTextInput("");
        inputRef.current.focus();
      });
  };
  return chatId && user ? (
    <div className="chat">
      <div className="link-handler">
        <button onClick={generateLink}>generate invitation link</button>
        <input name="link" ref={linkRef} className="link-input" />
        <label htmlFor="link">invite link</label>
        <input name="password" ref={passwordRef} className="password-input" />
        <label htmlFor="password">password</label>
      </div>
      <div className="messages">
        {!loadingMessages &&
          messages.map((value, index) => (
            <Message
              current={user}
              username={value.username}
              email={value.email}
              time={value.createdAt}
              content={value.content}
              image={value.image}
              key={index}
            />
          ))}
        <div ref={scroll}></div>
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
