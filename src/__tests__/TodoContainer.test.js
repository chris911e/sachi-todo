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

            fireEvent.click(getByText('New Todo').closest('li').querySelector('button.edit'));
            const editInputElement = getByDisplayValue('New Todo');
            fireEvent.change(editInputElement, { target: { value: 'Updated Todo' } });
            fireEvent.submit(editInputElement.closest('form'));

            expect(getByText('Updated Todo')).toBeInTheDocument();
            expect(getByText('New Todo')).not.toBeInTheDocument();
      });

      test('filters todo items by completion status', () => {
            const { getByPlaceholderText, getByText, getByRole, getAllByRole } = render(<TodoContainer />);
            const inputElement = getByPlaceholderText('Add todo...');
            const dateElement = getByRole('dateInput');

            fireEvent.change(inputElement, { target: { value: 'New Todo' } });
            fireEvent.change(dateElement, { target: { value: "2011-10-05" } });
            fireEvent.submit(inputElement.closest('form'));

            fireEvent.change(inputElement, { target: { value: 'Another Todo' } });
            fireEvent.change(dateElement, { target: { value: "2011-10-06" } });
            fireEvent.submit(inputElement.closest('form'));

            const checkboxes = getAllByRole('checkbox');
            fireEvent.click(checkboxes[0]);

            fireEvent.click(getByText((content, element) => content.includes('Completed')));
            expect(getByText('New Todo')).toBeInTheDocument();
            expect(() => getByText('Another Todo')).toThrow();

            fireEvent.click(getByText('Active'));
            expect(getByText('Another Todo')).toBeInTheDocument();
            expect(() => getByText('New Todo')).toThrow();

            fireEvent.click(getByText('All'));
            expect(getByText('New Todo')).toBeInTheDocument();
            expect(getByText('Another Todo')).toBeInTheDocument();
        })
})