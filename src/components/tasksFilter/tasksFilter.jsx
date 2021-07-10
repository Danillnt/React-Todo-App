import React from "react";

import "./tasksFilter.css";

export default class TasksFilter extends React.Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button className="selected allTask" onClick={this.props.allTask}>
            <font>All</font>
          </button>
        </li>
        <li>
          <button
            className="selected activeTask"
            onClick={this.props.completedTask}
          >
            <font>Active</font>
          </button>
        </li>
        <li>
          <button
            className="selected completedTask"
            onClick={this.props.activeTask}
          >
            <font>Completed</font>
          </button>
        </li>
      </ul>
    );
  }
}
