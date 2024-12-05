import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputTodo from '@/app/components/InputTodo';

describe('Input Todo tests', () => {
    test('renders InputTodo component', () => {
        const { getByPlaceholderText, getByRole } = render(<InputTodo addTodoProps={() => {}} />);
        expect(getByPlaceholderText('Add todo...')).toBeInTheDocument();
        expect(getByRole('button')).toBeInTheDocument();
      });
      
      test('updates input value on change', () => {
        const { getByPlaceholderText } = render(<InputTodo addTodoProps={() => {}} />);
        const inputElement = getByPlaceholderText('Add todo...');
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        expect(inputElement.value).toBe('New Todo');
      });
      
      test('calls addTodoProps on valid form submission', () => {
        const addTodoProps = jest.fn();
        const { getByPlaceholderText } = render(<InputTodo addTodoProps={addTodoProps} />);
        const inputElement = getByPlaceholderText('Add todo...');
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.submit(inputElement.closest('form'));
        expect(addTodoProps).toHaveBeenCalledWith('New Todo');
        expect(inputElement.value).toBe('');
      });
      
      test('shows alert on empty form submission', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        const { getByPlaceholderText } = render(<InputTodo addTodoProps={() => {}} />);
        const inputElement = getByPlaceholderText('Add todo...');
        fireEvent.submit(inputElement.closest('form'));
        expect(window.alert).toHaveBeenCalledWith('Please write item');
      });
})
