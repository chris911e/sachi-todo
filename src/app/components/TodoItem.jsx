/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  
  const { completed, id, title, category } = props.todo;

  const [editing, setEditing] = useState(false);
  const [newCategory, setNewCategory] = useState(category)

  const handleEditing = () => {
    setEditing(true);
  };

  const handleCategoryChange = (e) => {
    const newSelectedCateogry = e.target.value
    setNewCategory(newSelectedCateogry)
    props.handleToDoCategoryChange(id, newSelectedCateogry)
  }

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  useEffect(
    () => () => {
      console.log("Cleaning up...");
    },
    []
  );

  return (
    <li className={styles.item} data-type="todo-item">
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => props.handleChangeProps(id)}
          name="checkbox"
        />
        <button
          data-set="delete-todo-btn"
          onClick={() => props.deleteTodoProps(id)}
        >
          <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
        <span style={completed ? completedStyle : null}>{title}</span>
        <select
          value={newCategory}
          onChange={handleCategoryChange}
          style={{ 
            marginLeft: "10px", 
            padding: "5px",
            fontSize: "14px",
            borderRadius: "10px"
          }}
        >
          {
            props.categories.map((value, key) => {
              return(
                <option value={value} key={key}>
                  {value}
                </option>
              )
            })
          }
        </select>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={title}
        onChange={(e) => {
          props.setUpdate(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};

export default TodoItem;
