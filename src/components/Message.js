import React from "react";

function Message({ content, username, time, image }) {
  return <div className="message">{`[${time}] ${username}: ${content}`}</div>;
}

export default Message;
