import React from "react";

function Message({ content, username, time, image }) {
  return (
    <div className="message">
      <img src={image} className="image-icon" />
      {`[${time}] ${username}: ${content}`}
    </div>
  );
}

export default Message;
