import React from "react";

function Message({ content, username, time, email, image, current }) {
  return (
    <div className={`message ${current.email === email ? "sent" : "received"}`}>
      <img src={image} className="image-icon" />
      {`[${time}] ${username}: ${content}`}
    </div>
  );
}

export default Message;
