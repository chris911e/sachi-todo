/* eslint react/prop-types: 0 */
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
    expiration: ""
  });

  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.title.trim() && inputText.expiration.trim()) {
      console.log(new Date(inputText.expiration))
      props.addTodoProps(inputText.title, new Date(inputText.expiration));
      setInputText({
        title: "",
        expiration: ""
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
        value={inputText.title}
        name="title"
        onChange={onChange}
      />
      <input
        type="date"
        className="input-text"
        role="dateInput"
        placeholder="Expiration date"
        value={inputText.expiration}
        name="expiration"
        onChange={onChange}
      />
      <button data-set="add-todo-btn" className="input-submit">
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default InputTodo;