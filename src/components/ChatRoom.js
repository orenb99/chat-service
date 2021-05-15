import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import {useCollectionData} from "react-firebase-hooks/firestore"
import Chat from "./Chat";
function ChatRoom({ user }) {
  const [userChats, setUserChats] = useState();
  const [addInput, setAddInput] = useState();
  const [currentChat, setCurrentChat] = useState();
  const db = firebase.firestore();
  const usersRef = db.collection("Users");
  const chatsRef = db.collection("Chats");
  const addRef = useRef();
  useEffect(() => {
    if (user) {
      const query = usersRef
        .where("email", "==", user.email)
        .get()
        .then((result) => {
          setUserChats(result.docs[0].data().chats);
        });
    }
  }, [user]);
  const addChat = async () => {
    const chatToAdd = await chatsRef.doc(addInput).get();
    if (!chatToAdd.exists || chatToAdd.data().users.includes(user.email))
      return;
    let chatsList = [...userChats];
    chatsList.push(addInput);
    usersRef.doc(user.email).update({ chats: chatsList });
    setUserChats(chatsList);
    setAddInput("");
    addRef.current.value = "";
    addRef.current.focus();
  };
  const createChat = () => {
    let chatId = "chatroom" + new Date().getTime();
    chatsRef
      .doc(chatId)
      .set({ users: [user.email] })
      .then(() => {
        if (userChats === undefined) {
          usersRef
            .doc(user.email)
            .update({ chats: [chatId] })
            .then(() => setUserChats([chatId]))
            .catch((err) => console.log(err));
        } else {
          let arrayToTransfer = [...userChats];
          arrayToTransfer.push(chatId);
          usersRef
            .doc(user.email)
            .update({ chats: arrayToTransfer })
            .then(() => setUserChats(arrayToTransfer))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>Chat Rooms</h2>
      <button onClick={createChat}>Create new chat room</button>
      <br />
      <input
        name="chat-id-input"
        placeholder="enter chat id"
        onChange={(e) => setAddInput(e.target.value)}
        ref={addRef}
      />
      <button onClick={addChat}>add chat</button>

      <div className="chat-rooms">
        {userChats ? (
          userChats.map((value, index) => (
            <h3
              key={index}
              onClick={() => {
                setCurrentChat(value);
              }}
            >
              {value}
            </h3>
          ))
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      <Chat user={user} chatId={currentChat} />
    </div>
  );
}

export default ChatRoom;
