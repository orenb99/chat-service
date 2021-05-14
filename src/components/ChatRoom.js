import React, { useState, useEffect } from "react";
import firebase from "firebase";
function ChatRoom({ user }) {
  const [userData, setUserData] = useState();
  const db = firebase.firestore();
  const usersRef = db.collection("Users");
  useEffect(() => {
    if (user) {
      const query = usersRef
        .where("email", "==", user.email)
        .get()
        .then((result) => {
          setUserData({ ...result.docs[0].data() });
        });
    }
  }, [user]);
  return (
    <div>
      <h2>Chat Rooms</h2>
      {userData &&
        userData.chats.map((value) => {
          <h4>{value}</h4>;
        })}
    </div>
  );
}

export default ChatRoom;
