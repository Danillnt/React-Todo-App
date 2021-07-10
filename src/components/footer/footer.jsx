import React, { Component } from "react";

import TasksFilter from "../tasksFilter/tasksFilter";

import "./footer.css";

export default class Footer extends Component {
  render() {
    const { done } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">
          <font>{done} items</font>
        </span>
        <TasksFilter
          activeTask={this.props.activeTask}
          completedTask={this.props.completedTask}
          allTask={this.props.allTask}
        />
        <button className="clear-completed" onClick={this.props.clearСompleted}>
          <font>Clear completed</font>
        </button>
      </footer>
    );
  }
}
