import { render, fireEvent, within } from "@testing-library/react";
import FilterModal from "@/app/components/FilterModal";

import TodoContainer from "@/app/components/TodoContainer";
import TodoList from "@/app/components/TodosList";

describe("todo filters test", () => {
    const sampleData =
        [
            {
                "id": "48793583-5ca1-483d-b189-e653515e8be2",
                "title": "todo 1",
                "completed": false,
                "category": "Unkategorisiert",
                "priority": 0,
                "expiration": new Date("2025-01-04")
            },
            {
                "id": "dff5ef6d-ca33-4d1a-a4f5-a6831d6303ef",
                "title": "todo 2",
                "completed": false,
                "category": "Unkategorisiert",
                "priority": 1,
                "expiration": new Date("2025-02-04")
            },
            {
                "id": "254bfeef-ebac-405c-b413-b87fb72f73d8",
                "title": "todo 3",
                "completed": false,
                "category": "Arbeit",
                "priority": 2,
                "expiration": new Date("2026-01-04")
            }
        ]

    test("set priority filter", () => {
        const screen = render(<TodoContainer />)

        const filterButton = screen.getByTestId("filter-button")
        fireEvent.click(filterButton)

        const filterModal = screen.getByTestId("filter-modal")
        expect(filterModal).toBeInTheDocument()

        const priorityFilter = screen.getByTestId("priority-filter")
        fireEvent.click(priorityFilter)

        const priorityFilterList = screen.getByTestId("priority-filter-list")
        fireEvent.click(priorityFilterList)

        const selectPriority = within(priorityFilterList).getByText("Low")
        fireEvent.click(selectPriority)

        const priorityStyle = getComputedStyle(selectPriority)._values["font-weight"]
        expect(priorityStyle).toBe("bold")
    })

    test("set category filter", () => {
        const screen = render(<TodoContainer />)

        const filterButton = screen.getByTestId("filter-button")
        fireEvent.click(filterButton)

        const filterModal = screen.getByTestId("filter-modal")
        expect(filterModal).toBeInTheDocument()

        const categoryFilter = screen.getByTestId("category-filter")
        fireEvent.click(categoryFilter)

        const categoryFilterList = screen.getByTestId("category-filter-list")
        fireEvent.click(categoryFilterList)

        const selectCategory = within(categoryFilterList).getByText("Arbeit")
        fireEvent.click(selectCategory)

        const categoryStyle = getComputedStyle(selectCategory)._values["font-weight"]
        expect(categoryStyle).toBe("bold")
    })

    test("filters todos by priority", () => {
        const screen = render(
            <TodoContainer
                sampleData={sampleData}
                filterData={
                    {
                        "priority": "Low",
                        "expiration": "",
                        "category": ""
                    }
                }
            />
        )

        const todoList = screen.getByTestId("todo-list")
        expect(todoList).toBeInTheDocument()

        const todoItems = screen.getAllByTestId("todo-item")
        expect(todoItems).toHaveLength(1)
    })
    
    test("filters todos by category", () => {
        const screen = render(
            <TodoContainer
                sampleData={sampleData}
                filterData={
                    {
                        "priority": "",
                        "expiration": "",
                        "category": "Arbeit"
                    }
                }
            />
        )

        const todoList = screen.getByTestId("todo-list")
        expect(todoList).toBeInTheDocument()

        const todoItems = screen.getAllByTestId("todo-item")
        expect(todoItems).toHaveLength(1)
    })
})