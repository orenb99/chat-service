import React from "react";

function Message({ content, username, time, email, image, current }) {
  return (
    <div className="message-div">
      <table
        className={`message ${current.email === email ? "sent" : "received"}`}
      >
        <tr>
          {current.email !== email && (
            <td className="img-td">
              <img src={image} className="image-icon" />
            </td>
          )}
          <td className="text-td">
            <h3 className="time">{`[${time}]`}</h3>
            <h3 className="username">{username}</h3>
            <h3 className="content">{content}</h3>
          </td>
          {current.email === email && (
            <td className="img-td">
              <img src={image} className="image-icon" />
            </td>
          )}
        </tr>
      </table>
    </div>
  );
}

export default Message;
