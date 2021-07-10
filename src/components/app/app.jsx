import React, { Component } from "react";

import NewTaskForm from "../newTaskForm/newTaskForm";
import TaskList from "../taskList/taskList";
import Footer from "../footer/footer";

import "./app.css";

export default class App extends Component {
  maxId = 100; //id элементов списка

  state = {
    todoData: [], //массив с объектами элементами с доп.инфой
  };

  //создаем новый элемент
  addTask = (text) => {
    // const newTask = this.createTodoItem(text);
    const newTask = {
      label: text, // текст инпута
      id: this.maxId++, //id для списка
      done: false, //состояние перечёркнуто
      all: false, //состояние нажатие кнопки "весь список"
      active: false, //состояние нажатие кнопки "активные"
      completed: false, //состояние нажатие кнопки "завершенные"
      date: new Date(), //получаем дату при создании элемента
      stop: false, //статус счётчика времени
      play: false, //статус счётчика времени
    };

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];

      return {
        todoData: newArr,
      };
    });
  };

  //удаляем элемент по переданному id
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((i) => {
        if (i.id !== id) {
          return i;
        } else {
          return null;
        }
      });

      return {
        todoData: newArray,
      };
    });
  };

  //очистить завершённые
  clearСompleted = () => {
    this.setState(({ todoData }) => {
      const newTask = todoData.filter((i) => {
        if (!i.done) {
          return i;
        } else {
          return null;
        }
      });
      return {
        todoData: newTask,
      };
    });
  };

  //зачеркивание текста
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

  //нажатие кнопки активные меняем состояние компонента (скрваем елементы с помощью нового класса)
  activeTask = () => {
    this.setState(({ todoData }) => {
      let newArr = todoData.filter((i) => {
        if (!i.done) {
          i.active = true;
          return i;
        } else {
          i.completed = false;
          return i;
        }
      });

      return {
        todoData: newArr,
      };
    });
  };

  //нажатие кнопки завершённые меняем состояние компонента (скрваем елементы с помощью нового класса)
  completedTask = () => {
    this.setState(({ todoData }) => {
      let newArr = todoData.filter((i) => {
        if (i.done) {
          i.completed = true;
          return i;
        } else {
          i.active = false;
          return i;
        }
      });

      return {
        todoData: newArr,
      };
    });
  };

  //нажатие кнопки все задачи меняем состояние компонента (показываем елементы с помощью класса)
  allTask = () => {
    this.setState(({ todoData }) => {
      let newArr = todoData.filter((i) => {
        i.all = true;
        i.active = false;
        i.completed = false;
        return i;
      });

      return {
        todoData: newArr,
      };
    });
  };

  //счётчик оставшихся задач
  doneCount = (todoData) => {
    const doneCount = todoData.filter((el) => el.done).length;
    return todoData.length - doneCount;
  };

  render() {
    const { todoData } = this.state;

    // console.log(todoData);

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
