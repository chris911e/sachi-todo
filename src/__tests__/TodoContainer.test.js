import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoContainer from '@/app/components/TodoContainer';

test('adds a new todo item', () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(<TodoContainer />);
  const inputElement = getByPlaceholderText('Add todo...');
  fireEvent.change(inputElement, { target: { value: 'New Todo' } });
  fireEvent.submit(getByTestId('todo-form'));
  expect(getByText('New Todo')).toBeInTheDocument();
});

test('deletes a todo item', () => {
  const { getByPlaceholderText, getByTestId, getByText, queryByText } = render(<TodoContainer />);
  const inputElement = getByPlaceholderText('Add todo...');
  fireEvent.change(inputElement, { target: { value: 'New Todo' } });
  fireEvent.submit(getByTestId('todo-form'));
  expect(getByText('New Todo')).toBeInTheDocument();
  fireEvent.click(getByTestId('delete-todo-btn'));
  expect(queryByText('New Todo')).toBeNull();
});

test('toggles completion status of a todo item', () => {
  const { getByPlaceholderText, getByTestId, getByRole } = render(<TodoContainer />);
  const inputElement = getByPlaceholderText('Add todo...');
  fireEvent.change(inputElement, { target: { value: 'New Todo' } });
  fireEvent.submit(getByTestId('todo-form'));
  const checkbox = getByRole('checkbox');
  expect(checkbox.checked).toBe(false);
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
});