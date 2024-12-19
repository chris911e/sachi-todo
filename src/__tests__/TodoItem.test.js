import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from '@/app/components/TodoItem';

const todo = {
  id: 1,
  title: 'Test Todo',
  completed: false,
  category: "Unkategorisiert",
  priority: 0,
  expiration: new Date().toISOString()
};

const categories = [
  "Unkategorisiert",
  "Arbeit",
  "Personal",
  "Einkauf"
]

describe('ToDo Item tests', () => { 
    test('renders TodoItem component', () => {
        const { getByText } = render(
          <TodoItem
            todo={todo}
            handleChangeProps={() => {}}
            deleteTodoProps={() => {}}
            setUpdate={() => {}}
            setExpirationUpdate={() => {}}
            selectedCategory={todo.category}
            categories={categories}
            handleToDoCategoryChange={() => {}}
            handleToDoPriorityChange={() => {}}
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
            setExpirationUpdate={() => {}}
            selectedCategory={todo.category}
            categories={categories}
            handleToDoCategoryChange={() => {}}
            handleToDoPriorityChange={() => {}}
          />
        );
        fireEvent.click(getByRole('checkbox'));
        expect(handleChangeProps).toHaveBeenCalledWith(1);
      });
      
      test('calls deleteTodoProps on delete button click', () => {
        const deleteTodoProps = jest.fn();
        const { getByRole } = render(
          <TodoItem
            todo={todo}
            handleChangeProps={() => {}}
            deleteTodoProps={deleteTodoProps}
            setUpdate={() => {}}
            setExpirationUpdate={() => {}}
            selectedCategory={todo.category}
            categories={categories}
            handleToDoCategoryChange={() => {}}
            handleToDoPriorityChange={() => {}}
          />
        );
        fireEvent.click(getByRole('button'));
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
            setExpirationUpdate={() => {}}
            selectedCategory={todo.category}
            categories={categories}
            handleToDoCategoryChange={() => {}}
            handleToDoPriorityChange={() => {}}
          />
        );
        fireEvent.doubleClick(getByText('Test Todo'));
        const inputElement = getByDisplayValue('Test Todo');
        expect(inputElement).toBeInTheDocument();
        fireEvent.change(inputElement, { target: { value: 'Updated Todo' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', which: 13 });
        expect(setUpdate).toHaveBeenCalledWith('Updated Todo', 1);
      });
})
