export const sortTodos = (todos, order) => {
  if (order === "Ascend") {
    return todos.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));
  } else if (order === "Descend") {
    return todos.sort((a, b) => new Date(b.expiration) - new Date(a.expiration));
  }
  return todos;
};