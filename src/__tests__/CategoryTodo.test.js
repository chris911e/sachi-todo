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


describe("Tests Category Todo", () => {
    test('should test category todo', () => {

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
        const categoryOption = screen.getByTestId("category-todo-1")
        expect(categoryOption).toBeInTheDocument()
        
        fireEvent.change(categoryOption, { target: { value: "Personal" } })
        
        expect(categoryOption.value).toBe("Personal")
    })
})