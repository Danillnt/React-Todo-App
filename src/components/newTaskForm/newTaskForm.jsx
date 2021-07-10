import React, { Component } from "react";

import "./newTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    label: "", //текст с импута
  };

  //в состояние записываем нажатые символы импута
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  //после нажатия enter вызываем функцию с ком.app и добовляем элемент
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form className="taskAddForm" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
        />
      </form>
    );
  }
}
