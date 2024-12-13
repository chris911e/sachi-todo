'use client'

import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import styles from "./TodoContainer.module.css";
import CategoryButton from "./CategoryButton";
import Image from "next/image";
import filter from "./assets/filter.svg"

const TodoContainer = () => {
  // test data
  const [categories, setCategories] = useState([
    "Unkategorisiert",
    "Arbeit",
    "Personal",
    "Einkauf"
  ])
  const [todos, setTodos] = useState([/*
    {
      "id": "48793583-5ca1-483d-b189-e653515e8be2",
      "title": "todo 1",
      "completed": false,
      "category": "Unkategorisiert"
    },
    {
      "id": "dff5ef6d-ca33-4d1a-a4f5-a6831d6303ef",
      "title": "todo 2",
      "completed": false,
      "category": "Unkategorisiert"
    },
    {
      "id": "254bfeef-ebac-405c-b413-b87fb72f73d8",
      "title": "todo 3",
      "completed": false,
      "category": "Arbeit"
    }
  */]);

  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [filters, setFilters] = useState({
    "severity": "",
    "expiration": "",
    "category": ""
  })

  const handleFilterChange = (category, value) => {
    // logic
  }

  const getInitialTodos = () => {
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  };

  useEffect(() => {
    getInitialTodos()
  }, []);

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const handleToDoCategoryChange = (id, updatedCategory) => {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if(todo.id === id) {
          return {
            ...todo,
            category: updatedCategory
          }
        }
        return todo
      })
    })
  }

  const delTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const delCategory = (name) => {
    setCategories([...categories.filter((category) => category !== name)])
  }

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
      category: "Unkategorisiert"
    };
    setTodos([...todos, newTodo]);
  };

  const valueExists = (array, value) => {
    return array.includes(value)
  }

  const addCategory = (category) => {
    if(valueExists(categories, category)) {
      alert("Category already exists")
      return
    }
    if(categories.length > 10) {
      alert("Max category amount reached")
      return
    }
    setCategories([...categories, category])
  }

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };

  // storing todos items
  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
    console.log(todos)
  }, [todos]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{
        position: "relative",
        width: "50%"
      }}>
        <Header />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 5, alignItems: "center" }}>
          <button
            onClick={() => setFilterModalVisible(true)}
            style={{
              all: "unset",
              cursor: "pointer"
            }}
          >
            <Image src={filter} alt="filter" height={32} width={32} />
          </button>
          <InputTodo addTodoProps={addTodoItem} />
          <CategoryButton
            addCategory={addCategory}
            categories={categories}
            deleteCategoryProp={delCategory}
          />
        </div>
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <TodosList
          todos={todos}
          handleChangeProps={handleChange}
          handleCategoryChange={handleToDoCategoryChange}
          deleteTodoProps={delTodo}
          setUpdate={setUpdate}
          categories={categories}
        />
        {
          filterModalVisible && (
            <div
              onClick={() => setFilterModalVisible(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "flex-start"
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: "whitesmoke",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  height: "100vh",
                  maxWidth: "300px",
                  width: "90%"
                }}
              >
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "5px",
                  gap: 5
                }}>
                  <div style={{
                    textAlign: "center"
                  }}>
                    <strong>Filters</strong>
                  </div>
                  <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
                  <div>
                    Severity
                  </div>
                  <div>
                    Expiration
                  </div>
                  <div>
                    Category
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TodoContainer;
