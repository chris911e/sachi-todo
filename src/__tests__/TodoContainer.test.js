import React from 'react';
import { render, fireEvent, getByTitle, getByRole, getByTestId } from '@testing-library/react';
import TodoContainer from '@/app/components/TodoContainer';

describe('Todo Container test', () => {
    test('adds a new todo item', () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(<TodoContainer />);
        const inputElement = getByPlaceholderText('Add todo...');
        const dateElement = getByTestId('expiration');

        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.change(dateElement, { target: { value: new Date(2006, 1, 15) } });
        fireEvent.submit(inputElement.closest('form'));
        expect(getByText('New Todo')).toBeInTheDocument();
      });
      
      test('deletes a todo item', () => {
        const { getByPlaceholderText, getByText, queryByText, getByTestId } = render(<TodoContainer />);
        const inputElement = getByPlaceholderText('Add todo...');
        const dateElement = getByTestId('expiration');

        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.change(dateElement, { target: { value: new Date(2006, 1, 15) } });
        fireEvent.submit(inputElement.closest('form'));

        expect(getByText('New Todo')).toBeInTheDocument();
        fireEvent.click(getByText('New Todo').closest('li').querySelector('button'));
        expect(queryByText('New Todo')).toBeNull();
      });
      
      test('toggles completion status of a todo item', () => {
        const { getByPlaceholderText, getByText, getByRole, getByTestId } = render(<TodoContainer />);
        const inputElement = getByPlaceholderText('Add todo...');
        const dateElement = getByTestId('expiration');
        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.change(dateElement, { target: { value: new Date(2006, 1, 15) } });
        fireEvent.submit(inputElement.closest('form'));
        const checkbox = getByRole('checkbox');
        expect(checkbox.checked).toBe(false);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
      });
})
