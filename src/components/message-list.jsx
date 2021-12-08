import React from "react";
import Button from "@material-ui/core/Button";

import Messages from "./Messages";
import MessageTable from "./MessageTable";

import Api from "../api";

class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      messages: [],
    };
  }

  api = new Api({
    messageCallback: message => {
      this.messageCallback(message);
    },
  });

  componentDidMount() {
    this.api.start();
  }

  messageCallback(message) {
    const { messages } = this.state;
    this.setState(
      {
        messages: [...messages.slice(), message],
      },
      () => {
        // Included to support initial direction. Please remove upon completion
        console.log("testi");
      }
    );
  }

  handleMessagesClick = () => {
    const isApiStarted = this.api.isStarted();
    if (isApiStarted) {
      this.api.stop();
    } else {
      this.api.start();
    }
    this.forceUpdate();
  };

  handleClearClick = () => {
    // const isApiStarted = this.api.isStarted();
    // if (isApiStarted) {
    //   this.api.stop();
    // } else {
    //   this.api.start();
    // }
    // this.forceUpdate();
    console.log("delete messages");
  };

  render() {
    const isApiStarted = this.api.isStarted();
    return (
      <div>
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <Messages />
        </div>
        <div className="flex items-center py-4">
          <div className="mx-auto">
            <Button
              className="space-x-4"
              variant="contained"
              onClick={this.handleMessagesClick}
            >
              {isApiStarted ? "Stop Messages" : "Start Messages"}
            </Button>
            <Button
              className="space-x-4"
              variant="contained"
              onClick={this.handleClearClick}
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="flex items-center py-4">
          <MessageTable messages={this.state.messages} />
        </div>
      </div>
    );
  }
}

export default MessageList;
