import React from "react";

function Message({ content, username, time, image, current }) {
  return (
    <div
      className={`message ${
        current.displayName === username ? "sent" : "received"
      }`}
    >
      <img src={image} className="image-icon" />
      {`[${time}] ${username}: ${content}`}
    </div>
  );
}

export default Message;
