import React, { Component } from "react";

import NewTaskForm from "../newTaskForm/newTaskForm";
import TaskList from "../taskList/taskList";
import Footer from "../footer/footer";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [],
  };

  addTask = (text) => {
    if (text.length > 0) {
      const newTask = {
        label: text,
        id: this.maxId++,
        done: false,
        all: false,
        active: false,
        completed: false,
        date: new Date(),
        stop: false,
        play: false,
      };

      this.setState(({ todoData }) => {
        const newArr = [...todoData, newTask];

        return {
          todoData: newArr,
        };
      });
    }
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => {
        if (item.id !== id) {
          return item;
        } else {
          return null;
        }
      });

      return {
        todoData: newArray,
      };
    });
  };

  clearСompleted = () => {
    this.setState(({ todoData }) => {
      const newTask = todoData.filter((item) => {
        if (!item.done) {
          return item;
        } else {
          return null;
        }
      });
      return {
        todoData: newTask,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newItem = todoData[idx];
      newItem.done = !newItem.done;

      return {
        todoData: [
          ...todoData.slice(0, idx),
          newItem,
          ...todoData.slice(idx + 1),
        ],
      };
    });
  };

  activeTask = () => {
    this.setState(({ todoData }) => {
      let newArr = todoData.filter((item) => {
        if (!item.done) {
          item.active = true;
          return item;
        } else {
          item.completed = false;
          return item;
        }
      });

      return {
        todoData: newArr,
      };
    });
  };

  completedTask = () => {
    this.setState(({ todoData }) => {
      let newArr = todoData.filter((item) => {
        if (item.done) {
          item.completed = true;
          return item;
        } else {
          item.active = false;
          return item;
        }
      });

      return {
        todoData: newArr,
      };
    });
  };

  allTask = () => {
    this.setState(({ todoData }) => {
      let newArr = todoData.filter((item) => {
        item.all = true;
        item.active = false;
        item.completed = false;
        return item;
      });

      return {
        todoData: newArr,
      };
    });
  };

  doneCount = (todoData) => {
    const doneCount = todoData.filter((el) => el.done).length;
    return todoData.length - doneCount;
  };

  render() {
    const { todoData } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>
            <font>todos</font>
          </h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            deleteItem={this.deleteItem}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            done={this.doneCount(todoData)}
            clearСompleted={this.clearСompleted}
            activeTask={this.activeTask}
            completedTask={this.completedTask}
            allTask={this.allTask}
          />
        </section>
      </section>
    );
  }
}
