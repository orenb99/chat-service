import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import Chat from "./Chat";
function ChatRoom({ user }) {
  const [userEmail, setUserEmail] = useState();
  const [username, setUsername] = useState();
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
          setUserEmail(result.docs[0].data().email);
          setUsername(result.docs[0].data().username);
          setUserChats(result.docs[0].data().chats);
        });
    }
  }, [user]);
  const addChat = async () => {
    const chatToAdd = await chatsRef.doc(addInput).get();
    if (!chatToAdd.exists || chatToAdd.data().users.includes(userEmail)) return;
    let chatsList = [...userChats];
    chatsList.push(addInput);
    usersRef.doc(userEmail).update({ chats: chatsList });
    setUserChats(chatsList);
    setAddInput("");
    addRef.current.value = "";
    addRef.current.focus();
  };
  const createChat = () => {
    let chatId = "chatroom" + new Date().getTime();
    chatsRef
      .doc(chatId)
      .set({ users: [userEmail] })
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
      <Chat user={user} username={username} chatId={currentChat} />
    </div>
  );
}

export default ChatRoom;
