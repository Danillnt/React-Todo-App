import React, { Component } from "react";

import "./task.css";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default class Task extends Component {
  state = {
    label: this.props.label,
    hiddenForm: false,
    sek: 0,
    min: 0,
    play: false,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  clickEditForm = () => {
    this.setState({
      hiddenForm: true,
    });
  };

  hearEnter = (e) => {
    if (e.target.value.length > 0) {
      if (e.key === "Enter") {
        this.setState({
          hiddenForm: false,
        });
      }
    }
  };

  addClassNameItem = (all, completed, active) => {
    if (all && !completed && !active) {
      return "item";
    } else if (completed) {
      return "hidden";
    } else if (active) {
      return "hidden";
    }
  };

  increment() {
    if (this.state.sek <= 60 && this.state.play) {
      this.setState({
        sek: this.state.sek + 1,
      });
    }
    if (this.state.sek > 60 && this.state.play) {
      this.setState({
        sek: 0,
        min: this.state.min + 1,
      });
    }
  }

  componentDidMount() {
    // if (this.state.play) {
    this.timerID = setInterval(() => this.increment(), 1000);
    // }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  clickPlay = () => {
    this.setState({
      play: true,
    });
  };

  clickStop = () => {
    this.setState({
      play: false,
    });
  };

  render() {
    let { onToggleDone, done, completed, all, active, date, deleteItem } =
      this.props;

    const { sek, min } = this.state;

    let result = formatDistanceToNow(date, { includeSeconds: true });

    let classNames = "description";
    let classForm = "taskForm";

    if (done) {
      classNames += " done ";
    }

    if (this.state.hiddenForm) {
      classForm = "blockForm";
    }

    return (
      <div className="view">
        <form className={classForm} onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            value={this.state.label}
            onChange={this.onLabelChange}
            onKeyPress={this.hearEnter}
          ></input>
        </form>
        <div className={this.addClassNameItem(all, completed, active)}>
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleDone}
          ></input>
          <label>
            <span className={classNames}>
              <font>{this.state.label}</font>
            </span>
            <span className="timer">
              <button className=" icon-play" onClick={this.clickPlay}></button>
              <button className=" icon-pause" onClick={this.clickStop}></button>
              <span className="time">
                {min} : {sek}
              </span>
            </span>
            <span className="created">
              <font>created {result} ago</font>
            </span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={this.clickEditForm}
          ></button>
          <button
            type="button"
            className="icon icon-destroy"
            onClick={deleteItem}
          ></button>
        </div>
      </div>
    );
  }
}
