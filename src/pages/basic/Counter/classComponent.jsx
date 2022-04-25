import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "Bagus",
      count: 0, // 1
      increaseClick: 0,
      showName: true,
    };
    console.log("CONSTRUCTOR IS RUNNING");
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT IS RUNNING");
  }

  componentDidUpdate() {
    console.log("COMPONENT DID UPDATE IS RUNNING");
  }

  componentWillUnmount() {
    console.log("COMPONENT WILL UNMOUNT IS RUNNING");
  }

  increaseCounter = () => {
    console.log("Increase Counter");
    // [1]
    // if (this.state.increaseClick < 3) {
    //   this.setState({
    //     name: this.state.name + " Tri",
    //     increaseClick: this.state.increaseClick + 1,
    //   });
    // }

    // [2]
    this.setState({
      name:
        this.state.increaseClick < 3
          ? this.state.name + " Tri"
          : this.state.name,
      increaseClick: this.state.increaseClick + 1,
      count: this.state.count + 1,
    });
  };

  decreaseCounter = () => {
    console.log("Decrease Counter");
    this.setState({
      count: this.state.count - 1,
    });
  };

  resetCounter = () => {
    console.log("Reset Counter");
    this.setState({
      count: 0,
      showName: false,
    });
  };

  render() {
    console.log("JSX IS RUNNING");
    return (
      <div>
        {/* {this.state.showName && <h1>Hello {this.state.name}</h1>} */}
        {/* {this.state.showName ? <h1>Hello {this.state.name}</h1> : null} */}
        <h1>{this.state.count.toString()}</h1>
        <button onClick={this.decreaseCounter}>-</button>
        <button onClick={this.resetCounter}>reset</button>
        <button onClick={this.increaseCounter}>+</button>
      </div>
    );
  }
}

export default App;
