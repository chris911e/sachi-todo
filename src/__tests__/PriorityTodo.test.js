import { render, fireEvent } from "@testing-library/react";
import TodoItem from "@/app/components/TodoItem";

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

describe("Tests Priority Todo", () => {
    test('should test priority todo', () => {
        const screen = render(
            <TodoItem
                key={todo.id}
                todo={todo}
                selectedCategory={todo.category}
                handleChangeProps={() => {}}
                handleToDoCategoryChange={() => {}}
                handleToDoPriorityChange={() => {}}
                deleteTodoProps={() => {}}
                setUpdate={() => {}}
                setExpirationUpdate={() => {}}
                categories={categories}
              />
        )
        const priority = screen.getByTestId("priority-todo-1")
        expect(priority).toBeInTheDocument()
        fireEvent.click(priority)
        
        const priorityColor =getComputedStyle(priority).backgroundColor
        expect(priorityColor).toBe("RoyalBlue")
    })
})