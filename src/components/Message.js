import React, { useState, useEffect } from "react";

function Message({ content, username, time, email, image, current }) {
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  function fixText(text) {
    let fixedText = "";
    let counter = 0;
    for (let char of text) {
      if (char === " ") counter = 0;
      else counter++;
      if (counter === Math.floor(windowWidth / 27)) {
        fixedText += "\n";
        counter = 0;
      }
      fixedText += char;
    }
    return fixedText;
  }

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
            <h3 className="username">{username}</h3>
            <p className="content">{fixText(content)}</p>
            <h5 className="time">{`[${time
              .toDate()
              .toLocaleTimeString("it-IT")}]`}</h5>
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
