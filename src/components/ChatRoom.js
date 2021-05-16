import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
function ChatRoom({ user }) {
  const [currentChat, setCurrentChat] = useState();
  const db = firebase.firestore();
  const usersRef = db.collection("Users");
  const chatsRef = db.collection("Chats");
  const [userInfo, loadingInfo] = useCollectionData(
    usersRef.where("email", "==", user.email)
  );
  const createChat = () => {
    let chatId = "chatroom" + new Date().getTime();
    chatsRef
      .doc(chatId)
      .set({ chatId, users: [user.email] })
      .then(() => {
        if (userInfo[0].chats === undefined) {
          usersRef
            .doc(user.email)
            .update({ chats: [chatId] })
            .catch((err) => console.log(err));
        } else {
          let arrayToTransfer = [...userInfo[0].chats];
          arrayToTransfer.push(chatId);
          usersRef
            .doc(user.email)
            .update({ chats: arrayToTransfer })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="chat-room">
      <div className="chat-rooms">
        <h1 className="headline">Chat Rooms</h1>
        <button onClick={createChat}>Create new chat room</button>
        <br />
        <div className="rooms">
          {!loadingInfo && userInfo[0].chats ? (
            userInfo[0].chats.map((value, index) => (
              <h2
                className="chat-title"
                key={index}
                onClick={() => {
                  setCurrentChat(value);
                }}
              >
                {value}
              </h2>
            ))
          ) : (
            <h3>No chats available</h3>
          )}
        </div>
      </div>
      {currentChat && <Chat user={user} chatId={currentChat} />}
    </div>
  );
}

export default ChatRoom;
