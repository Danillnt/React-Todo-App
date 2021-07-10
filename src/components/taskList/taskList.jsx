import React, { Component } from "react";
import Task from "../task/task";
import "./taskList.css";

export default class TaskList extends Component {
  render() {
    let { todos, deleteItem, onToggleDone } = this.props;

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item;

      return (
        <li key={id} className="completed">
          <Task
            {...itemProps}
            deleteItem={() => deleteItem(id)}
            onToggleDone={() => onToggleDone(id)}
          />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
