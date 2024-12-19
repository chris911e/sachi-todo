'use client'

import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import CategoryButton from "./CategoryButton";
import Image from "next/image";
import FilterModal from "./FilterModal";
import filterAdd from "./assets/filterAdd.svg"
import filterTick from "./assets/filterTick.svg"

const TodoContainer = (props) => {
  const severities = ["Low", "Medium", "High"];
  // test data
  const [categories, setCategories] = useState([
    "Unkategorisiert",
    "Arbeit",
    "Personal",
    "Einkauf"
  ])
  const [todos, setTodos] = useState(props.sampleData ?? []);
  const [filteredTodos, setFilteredTodos] = useState(todos)

  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [filters, setFilters] = useState(props.filterData ?? {
    "priority": "",
    "expiration": "",
    "category": ""
  })

  const isFilterActive = Object.values(filters).some(value => value !== "");

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: value
    }))
  }

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      const isPriorityMatch = filters.priority === "" || filters.priority === severities[todo.priority];
      
      const isCategoryMatch = filters.category === "" || filters.category === todo.category;
      
      return isPriorityMatch && isCategoryMatch;
    });
    setFilteredTodos(filteredTodos);
    console.log(filters)
  }, [filters, todos])

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

  const handleToDoPriorityChange = (id, updatedPriority) => {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if(todo.id === id) {
          return {
            ...todo,
            priority: updatedPriority
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

  const addTodoItem = (title, expiration) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
      category: "Unkategorisiert",
      priority: 0,
      expiration: expiration
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

  const setTitleUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };

  const setExpirationUpdate = (updatedDate, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.expiration = updatedDate;
        }
        return todo;
      })
    );

    console.log(todos)
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
        <InputTodo addTodoProps={addTodoItem} />
        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: 5, alignItems: "center" }}>
          <CategoryButton
            addCategory={addCategory}
            categories={categories}
            deleteCategoryProp={delCategory}
          />
          <button
            onClick={() => setFilterModalVisible(true)}
            style={{
              all: "unset",
              cursor: "pointer",
              marginRight: "10px"
            }}
            data-testid="filter-button"
          >
            <Image src={isFilterActive ? filterTick : filterAdd} alt="filter" height={28} width={28} />
          </button>
        </div>
        <TodosList
          todos={filteredTodos}
          handleChangeProps={handleChange}
          handleCategoryChange={handleToDoCategoryChange}
          handlePriorityChange={handleToDoPriorityChange}
          deleteTodoProps={delTodo}
          setUpdate={setTitleUpdate}
          setExpirationUpdate={setExpirationUpdate}
          categories={categories}
          filters={filters}
        />
        {
          filterModalVisible && (
            <FilterModal
              hideModal={() => setFilterModalVisible(false)}
              handleFilterChange={handleFilterChange}
              categories={categories}
              filters={filters}
            />
          )
        }
      </div>
    </div>
  );
};

export default TodoContainer;
