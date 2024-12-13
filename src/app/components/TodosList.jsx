/* eslint react/prop-types: 0 */
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  return (
    <ul data-set="todo-list">
      {
        props.todos.length > 0 ? (
          props.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              selectedCategory={todo.category}
              handleChangeProps={props.handleChangeProps}
              handleToDoCategoryChange={props.handleCategoryChange}
              handleToDoPriorityChange={props.handlePriorityChange}
              deleteTodoProps={props.deleteTodoProps}
              setUpdate={props.setUpdate}
              categories={props.categories}
            />
          ))
        ) : (
          <div style={{
            textAlign: "center"
          }}>
            No todos
          </div>
        )
      }
    </ul>
  )
}
