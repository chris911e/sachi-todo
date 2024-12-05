import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoContainer from '@/app/components/TodoContainer';

describe('Todo Container test', () => {
    test('adds a new todo item', () => {
        const { getByPlaceholderText, getByText } = render(<TodoContainer />);
        const inputElement = getByPlaceholderText('Add todo...');
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.submit(inputElement.closest('form'));
        expect(getByText('New Todo')).toBeInTheDocument();
      });
      
      test('deletes a todo item', () => {
        const { getByPlaceholderText, getByText, queryByText } = render(<TodoContainer />);
        const inputElement = getByPlaceholderText('Add todo...');
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.submit(inputElement.closest('form'));
        expect(getByText('New Todo')).toBeInTheDocument();
        fireEvent.click(getByText('New Todo').closest('li').querySelector('button'));
        expect(queryByText('New Todo')).toBeNull();
      });
      
      test('toggles completion status of a todo item', () => {
        const { getByPlaceholderText, getByText, getByRole } = render(<TodoContainer />);
        const inputElement = getByPlaceholderText('Add todo...');
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.submit(inputElement.closest('form'));
        const checkbox = getByRole('checkbox');
        expect(checkbox.checked).toBe(false);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
      });
})
