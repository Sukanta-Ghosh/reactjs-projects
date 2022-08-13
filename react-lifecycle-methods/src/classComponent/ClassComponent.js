import React, { Component } from "react";
import Counter from "./Counter";

export default class ClassComponent extends Component {
  constructor() {
    super();
    console.log("constructor: Before component is mounted or render");
    this.state = {
      counter: 0,
    };
  }

  componentDidMount() {
    console.log("componentDidMount: When component render first time");
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  //Remove Counter component and componentWillUnmount will invoked.
  componentWillUnmount() {
    console.log("componentWillUnmount: component removed.");
  }

  render() {
    return (
      <div>
        <Counter number={this.state.counter} />
        <button onClick={() => this.increment()}>Click Me</button>
      </div>
    );
  }
}
