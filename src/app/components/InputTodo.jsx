/* eslint react/prop-types: 0 */
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [todoInput, setToDoInput] = useState({
    title: "",
    expiration: new Date(),
  });

  const onChange = (e) => {
    setToDoInput({
      ...todoInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoInput.title.trim()) {
      props.addTodoProps(todoInput.title, todoInput.expiration);
      setToDoInput({
        title: "",
        expiration: new Date(),
      });
    } else {
      alert("Please write item");
    }
  };

  return (
    <form
      data-set="todo-form"
      onSubmit={handleSubmit}
      className="form-container"
    >
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={todoInput.title}
        name="title"
        onChange={onChange}
      />
      <input
        type="date"
        className="input-text"
        value={todoInput.expiration}
        name="expiration"
        data-testid="expiration"
        onChange={onChange}
      />
      <button data-set="add-todo-btn" className="input-submit">
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default InputTodo;
