import { render, fireEvent } from "@testing-library/react";
import TodoContainer from "@/app/components/TodoContainer";

describe("Categories test", () => {
    test("should add category", () => {

        const screen = render(<TodoContainer />)

        const categoryButton = screen.getByTestId("category-button")
        expect(categoryButton).toBeInTheDocument()

        fireEvent.click(categoryButton)
        const categoryModal = screen.getByTestId("category-modal")
        expect(categoryModal).toBeInTheDocument()

        const inputCategory = screen.getByPlaceholderText("Enter Category Name")
        fireEvent.change(inputCategory, { target: { value: "Custom Category" } })

        const addCategoryButton = screen.getByTestId("add-category-button")
        fireEvent.click(addCategoryButton)

        const category = screen.getByText("Custom Category")

        expect(category).toBeInTheDocument()
    })

    test("should delete category", () => {

        const screen = render(<TodoContainer />)

        const categoryButton = screen.getByTestId("category-button")
        expect(categoryButton).toBeInTheDocument()

        fireEvent.click(categoryButton)
        const categoryModal = screen.getByTestId("category-modal")
        expect(categoryModal).toBeInTheDocument()

        const deleteCategory = screen.getByTestId("delete-Arbeit")
        fireEvent.click(deleteCategory)

        const deletedCategory = screen.queryByText("Arbeit")

        expect(deletedCategory).toBeNull()

    })
})