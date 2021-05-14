import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Chat from "./Chat";
function ChatRoom({ user }) {
  const [userEmail, setUserEmail] = useState();
  const [userChats, setUserChats] = useState();
  const db = firebase.firestore();
  const usersRef = db.collection("Users");
  const chatsRef = db.collection("Chats");
  useEffect(() => {
    if (user) {
      const query = usersRef
        .where("email", "==", user.email)
        .get()
        .then((result) => {
          setUserEmail(result.docs[0].data().email);
          setUserChats(result.docs[0].data().chats);
        });
    }
  }, [user]);

  const createChat = () => {
    let chatId = "chatroom" + new Date().getTime();
    chatsRef
      .doc(chatId)
      .set({ users: [userEmail], messages: [] })
      .then(() => {
        if (userChats === undefined) {
          usersRef
            .doc(userEmail)
            .update({ chats: [chatId] })
            .then(() => setUserChats([chatId]))
            .catch((err) => console.log(err));
        } else {
          let arrayToTransfer = [...userChats];
          arrayToTransfer.push(chatId);
          usersRef
            .doc(userEmail)
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
      <input name="chat-id-input" placeholder="enter chat id" />
      <button>add chat</button>

      <div className="chat-rooms">
        {userChats ? (
          userChats.map((value) => <h3 key={value}>{value}</h3>)
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      <Chat />
    </div>
  );
}

export default ChatRoom;
