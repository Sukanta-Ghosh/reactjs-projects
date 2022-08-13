import React, { Component } from "react";

export default class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props.number) {
      console.log("componentDidUpdate: Component Updated");
    }
  }

  render() {
    return (
      <div>
        <h3>{this.props.number}</h3>
      </div>
    );
  }
}
