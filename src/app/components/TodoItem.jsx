/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";
import Priority from "./Priority";

const TodoItem = (props) => {

  const { completed, id, title, category } = props.todo;

  const [newCategory, setNewCategory] = useState(category);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleCategoryChange = (e) => {
    const newSelectedCateogry = e.target.value;
    setNewCategory(newSelectedCateogry);
    props.handleToDoCategoryChange(id, newSelectedCateogry);
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    props.setUpdate(newTitle, id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditing(false);
      props.setUpdate(newTitle, id);
    }
  };

  useEffect(() => () => {
    console.log("Cleaning up...");
  }, []);

  return (
    <li className={styles.item} data-type="todo-item">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: "10px",
          alignItems: "center",
          zIndex: 1000
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={() => props.handleChangeProps(id)}
            name="checkbox"
          />
        </div>

        <div style={{ gridColumn: "2 / 7" }}>
          {editing ? (
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                padding: "5px",
                borderRadius: "5px",
                fontSize: "14px",
              }}
            />
          ) : (
            <div
              onDoubleClick={handleDoubleClick}
              style={{
                ...completed ? completedStyle : null,
                cursor: "pointer"
              }}
            >
              {title}
            </div>
          )}
        </div>

        <div>
          <select
            value={newCategory}
            onChange={handleCategoryChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              fontSize: "14px",
              borderRadius: "10px",
            }}
          >
            {props.categories.map((value, key) => {
              return (
                <option value={value} key={key}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <button
            data-set="delete-todo-btn"
            onClick={() => props.deleteTodoProps(id)}
          >
            <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
