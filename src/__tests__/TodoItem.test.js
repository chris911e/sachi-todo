import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from '@/app/components/TodoItem';

const todo = {
  id: 1,
  title: 'Test Todo',
  completed: false,
  category: "Unkategorisiert"
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
            selectedCategory={todo.category}
            categories={categories}
            handleToDoCategoryChange={() => {}}
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
            selectedCategory={todo.category}
            categories={categories}
            handleToDoCategoryChange={() => {}}
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
            selectedCategory={todo.category}
            categories={categories}
            handleToDoCategoryChange={() => {}}
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
            selectedCategory={todo.category}
            categories={categories}
            handleToDoCategoryChange={() => {}}
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
