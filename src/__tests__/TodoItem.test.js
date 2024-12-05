import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from '@/app/components/TodoItem';

const todo = {
  id: 1,
  title: 'Test Todo',
  completed: false,
};

test('renders TodoItem component', () => {
  const { getByText } = render(
    <TodoItem
      todo={todo}
      handleChangeProps={() => {}}
      deleteTodoProps={() => {}}
      setUpdate={() => {}}
    />
  );
  expect(getByText('Test Todo')).toBeInTheDocument();
});

test('calls handleChangeProps on checkbox change', () => {
  const handleChangeProps = jest.fn();
  const { getByRole } = render(
    <TodoItem
      todo={todo}
      handleChangeProps={handleChangeProps}
      deleteTodoProps={() => {}}
      setUpdate={() => {}}
    />
  );
  fireEvent.click(getByRole('checkbox'));
  expect(handleChangeProps).toHaveBeenCalledWith(1);
});

test('calls deleteTodoProps on delete button click', () => {
  const deleteTodoProps = jest.fn();
  const { getByTestId } = render(
    <TodoItem
      todo={todo}
      handleChangeProps={() => {}}
      deleteTodoProps={deleteTodoProps}
      setUpdate={() => {}}
    />
  );
  fireEvent.click(getByTestId('delete-todo-btn'));
  expect(deleteTodoProps).toHaveBeenCalledWith(1);
});

test('enables editing on double click and updates title', () => {
  const setUpdate = jest.fn();
  const { getByText, getByDisplayValue } = render(
    <TodoItem
      todo={todo}
      handleChangeProps={() => {}}
      deleteTodoProps={() => {}}
      setUpdate={setUpdate}
    />
  );
  fireEvent.doubleClick(getByText('Test Todo'));
  const inputElement = getByDisplayValue('Test Todo');
  expect(inputElement).toBeInTheDocument();
  fireEvent.change(inputElement, { target: { value: 'Updated Todo' } });
  expect(setUpdate).toHaveBeenCalledWith('Updated Todo', 1);
});