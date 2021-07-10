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

  //редактирум задачу инпутом
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  //отключаем перезагрузку страницы формы
  onSubmit = (e) => {
    e.preventDefault();
  };

  //открываем форму редактирования
  clickEditForm = () => {
    this.setState({
      hiddenForm: true,
    });
  };

  //закрываем форму редактирования
  hearEnter = (e) => {
    if (e.key === "Enter") {
      this.setState({
        hiddenForm: false,
      });
    }
  };

  //меняем класс элементов в зависимости от состояния после нажатие кнопок в футоре
  addClassNameItem = (all, completed, active) => {
    if (all && !completed && !active) {
      return "item";
    } else if (completed) {
      return "hidden";
    } else if (active) {
      return "hidden";
    }
  };

  //функция вызывается каждую секунду и меняет состояние
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

  //срабатывает после того, как компонент был впервые отрисован
  componentDidMount() {
    // if (this.state.play) {
    this.timerID = setInterval(() => this.increment(), 1000);
    // }
  }

  //очищать таймер в методе жизненного цикла
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //кнопка play
  clickPlay = () => {
    this.setState({
      play: true,
    });
  };

  //кнопка stop
  clickStop = () => {
    this.setState({
      play: false,
    });
  };

  render() {
    let { onToggleDone, done, completed, all, active, date, deleteItem } =
      this.props;

    const { sek, min } = this.state;

    let result = formatDistanceToNow(date, { includeSeconds: true }); // дата сколько минут назад создана задача

    let classNames = "description"; //для зачёркивания
    let classForm = "taskForm"; // для формы редактирования

    //зачёркиваем текст
    if (done) {
      classNames += " done ";
    }

    //показываем форму редактирования
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
