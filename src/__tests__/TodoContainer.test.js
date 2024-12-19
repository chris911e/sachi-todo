import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoContainer from '@/app/components/TodoContainer';

describe('Todo Container test', () => {
    jest.mock("next/image")

        test('adds a new todo item', () => {

          const { getByPlaceholderText, getByText, getByRole } = render(<TodoContainer />);
          const inputElement = getByPlaceholderText('Add todo...');
          const dateElement = getByRole('dateInput');

        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.change(dateElement, { target: { value: "2011-10-05" } });

        fireEvent.submit(inputElement.closest('form'));
        expect(getByText('New Todo')).toBeInTheDocument();
        expect(getByText("Wednesday, 5.10.2011")).toBeInTheDocument();
      });
      
      test('deletes a todo item', () => {
        const { getByPlaceholderText, getByText, queryByText, getByRole } = render(<TodoContainer />);
        const inputElement = getByPlaceholderText('Add todo...');
        const dateElement = getByRole('dateInput');

        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.change(dateElement, { target: { value: "2011-10-05" } });

        fireEvent.submit(inputElement.closest('form'));
        expect(getByText('New Todo')).toBeInTheDocument();

        fireEvent.click(getByText('New Todo').closest('li').querySelector('button'));
        expect(queryByText('New Todo')).toBeNull();
      });
      
      test('toggles completion status of a todo item', () => {
        const { getByPlaceholderText, getByRole } = render(<TodoContainer />);
        const inputElement = getByPlaceholderText('Add todo...');
        const dateElement = getByRole('dateInput');

        fireEvent.change(inputElement, { target: { value: 'New Todo' } });
        fireEvent.change(dateElement, { target: { value: "2011-10-05" } });

        fireEvent.submit(inputElement.closest('form'));
        const checkbox = getByRole('checkbox');
        expect(checkbox.checked).toBe(false);

        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
      });

      test('does not add a todo item with empty title', () => {
            const { getByPlaceholderText, queryByText, getByRole } = render(<TodoContainer />);
            const inputElement = getByPlaceholderText('Add todo...');
            const dateElement = getByRole('dateInput');

            fireEvent.change(dateElement, { target: { value: "2011-10-05" } });
            fireEvent.submit(inputElement.closest('form'));

            expect(queryByText('New Todo')).toBeNull();
      });

      test('does not add a todo item with empty expiration date', () => {
            const { getByPlaceholderText, queryByText } = render(<TodoContainer />);
            const inputElement = getByPlaceholderText('Add todo...');

            fireEvent.change(inputElement, { target: { value: 'New Todo' } });
            fireEvent.submit(inputElement.closest('form'));

            expect(queryByText('New Todo')).toBeNull();
        });

      test('edits a todo item', () => {
            const { getByPlaceholderText, getByText, getByDisplayValue, getByRole } = render(<TodoContainer />);
            const inputElement = getByPlaceholderText('Add todo...');
            const dateElement = getByRole('dateInput');

            fireEvent.change(inputElement, { target: { value: 'New Todo' } });
            fireEvent.change(dateElement, { target: { value: "2011-10-05" } });

            fireEvent.submit(inputElement.closest('form'));
            expect(getByText('New Todo')).toBeInTheDocument();
            let editInputElement = getByRole("todoEdit");

            fireEvent.dblClick(editInputElement)
            editInputElement = getByRole("todoEdit");

            fireEvent.change(editInputElement, { target: { value: 'Updated Todo' } });
            fireEvent.submit(editInputElement)
            fireEvent.enter;

            expect(getByRole('todoEdit').value).toBe("Updated Todo");
            expect(getByRole('todoEdit').value).not.toBe("New Todo");
      });
})