// __tests__/sortTodos.test.js

const { sortTodos } = require("@/app/components/utils/sortTodo");

describe('sortTodos', () => {
  const todos = [
    { id: 1, expiration: '2023-12-01' },
    { id: 2, expiration: '2023-11-01' },
    { id: 3, expiration: '2023-10-01' },
  ];

  it('should sort todos in ascending order', () => {
    const sortedTodos = sortTodos(todos, 'Ascend');
    expect(sortedTodos).toEqual([
      { id: 3, expiration: '2023-10-01' },
      { id: 2, expiration: '2023-11-01' },
      { id: 1, expiration: '2023-12-01' },
    ]);
  });

  it('should sort todos in descending order', () => {
    const sortedTodos = sortTodos(todos, 'Descend');
    expect(sortedTodos).toEqual([
      { id: 1, expiration: '2023-12-01' },
      { id: 2, expiration: '2023-11-01' },
      { id: 3, expiration: '2023-10-01' },
    ]);
  });

  it('should return todos unchanged if order is not specified', () => {
    const sortedTodos = sortTodos(todos, '');
    expect(sortedTodos).toEqual(todos);
  });
});