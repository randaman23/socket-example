import React, { Component } from "react";
import "./App.css";
import socket from "socket.io-client";

const io = socket.connect("http://localhost:3213");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      room: "",
      currentNumber: ""
    };
    io.on("message-to-user", message => {
      let messages = [...this.state.messages, message.message];
      this.setState({ messages });
    });
    io.on("joined-room", message => {
      let messages = [...this.state.messages, message.message];
      this.setState({ messages });
    });
  }

  handleClick() {
    io.emit("send-message", {
      message: this.state.message,
      room: this.state.currentNumber
    });
  }
  handleMessage(e) {
    this.setState({ message: e.target.value });
  }

  handleRoomChange() {
    this.setState({ currentRoom: this.state.room });
    io.emit("room-change", { room: this.state.room });
  }

  render() {
    return (
      <div className="App">
        <h1>Socket Demo</h1>
        <input
          type="text"
          placeholder="Write Message"
          onChange={e => this.handleMessage(e)}
        />
        <button onClick={() => this.handleClick()}>Send</button>
        <input
          type="text"
          placeholder="Room"
          onChange={e => this.setState({ room: e.target.value })}
        />
        <button onClick={() => this.handleRoomChange()}>Room</button>
        <div>{this.state.currentNumber}</div>
        {this.state.messages.map((val, i) => {
          return <div key={i}>{val}</div>;
        })}
      </div>
    );
  }
}

export default App;
