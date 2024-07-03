import "./Message.css";
import React from "react";
import If from "./If";

function Message(props) {
  const backgroundColorStyleValid = {
    backgroundColor: "green",
  };

  const backgroundColorStyleInvalid = {
    backgroundColor: "red",
  };

  return (
    <div className="content-message">
      <If test={props.valid === true}>
        <div className="message-container" style={backgroundColorStyleValid}>
          {props.message && <span className="message">{props.message}</span>}
        </div>
      </If>

      <If test={props.valid === false}>
        <div className="message-container" style={backgroundColorStyleInvalid}>
          {props.message && <span className="message">{props.message}</span>}
        </div>
      </If>
    </div>
  );
}

export default Message;
