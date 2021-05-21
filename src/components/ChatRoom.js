import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
function ChatRoom({ user, setCurrentChat }) {
  const db = firebase.firestore();
  const usersRef = db.collection("Users");
  const chatsRef = db.collection("Chats");
  const [valid, setValid] = useState(false);
  const [userInfo, loadingInfo] = useCollectionData(
    usersRef.where("email", "==", user.email)
  );
  useEffect(() => {
    if (!loadingInfo)
      if (userInfo.length > 0)
        if (userInfo[0].chats) {
          setCurrentChat(userInfo[0].chats[0]);
          setValid(true);
        }
  }, [loadingInfo, userInfo]);
  const createChat = () => {
    let chatId = "chatroom" + new Date().getTime();
    chatsRef
      .doc(chatId)
      .set({ chatId, users: [user.email] })
      .then(() => {
        if (userInfo[0].chats === undefined) {
          usersRef.doc(user.email).update({ chats: [chatId] });
        } else {
          let arrayToTransfer = [...userInfo[0].chats];
          arrayToTransfer.unshift(chatId);
          usersRef
            .doc(user.email)
            .update({ chats: arrayToTransfer })
            .then(() => {
              setCurrentChat(chatId);
            });
        }
      });
  };
  return (
    <div className="chat-room">
      <h1 className="headline">Chat Rooms</h1>
      <NavLink className="profile-link" to="/profile">
        <h3>Go to profile</h3>
      </NavLink>
      <br />
      <button onClick={createChat}>Create new chat room</button>
      <br />
      <div className="rooms">
        {valid &&
          userInfo[0].chats.map((value, index) => (
            <NavLink
              to="/chat"
              className="room-title"
              key={index}
              onClick={() => {
                setCurrentChat(value);
              }}
            >
              <h2>{value}</h2>
            </NavLink>
          ))}
      </div>
    </div>
  );
}

export default ChatRoom;
