import React, { Component } from "react";
import styled from "styled-components/macro";
import { v4 as uuid } from "uuid";

import Filter from "./Filter";
import Input from "./Input";
import List from "./List";

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  min-width: 400px;
`;

class TodoList extends Component {
  state = {
    mode: "all",
    items: [
      {
        id: 1,
        label: "Make the <List /> component",
        completed: false,
      },
      {
        id: 2,
        label: "Finish the Todo List",
        completed: false,
      },
      {
        id: 3,
        label: "Drink a cup of tea",
        completed: true,
      },
    ],
  };

  handleModeChange = (mode) => () => {
    this.setState({ mode });
  };

  handleComplete = (id) => () => {
    const newItems = [...this.state.items];
    const filteredItem = newItems.filter((item) => item.id === id)[0];
    filteredItem.completed = !filteredItem.completed;

    this.setState({ item: newItems });
  };

  handleTaskAdd = (value) => {
    const task = {
      id: uuid(),
      label: value,
      completed: false,
    };

    const newItems = [...this.state.items, task];

    this.setState({ items: newItems });
  };

  handleDelete = (id) => () => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: filteredItems });
  };

  render() {
    const { mode, items } = this.state;

    let filteredItems = [];

    if (mode === "completed") {
      filteredItems = items.filter((item) => item.completed === true);
    } else if (mode === "active") {
      filteredItems = items.filter((item) => item.completed === false);
    } else {
      filteredItems = items;
    }

    return (
      <Wrapper>
        <Filter mode={mode} onModeChange={this.handleModeChange} />
        <Input onTaskAdd={this.handleTaskAdd} />
        <List
          items={filteredItems}
          onComplete={this.handleComplete}
          onDelete={this.handleDelete}
        />
      </Wrapper>
    );
  }
}

export default TodoList;
