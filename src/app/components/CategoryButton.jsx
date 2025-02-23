import { useState } from "react"
import { FaTrash } from "react-icons/fa"

export default function CategoryButton(props) {

    const [categoryModal, setCategoryModal] = useState(false)
    const [categoryName, setCategoryName] = useState("")

    const handleCategoryName = (e) => {
        const newValue = e.target.value
        setCategoryName(newValue)
    }

    const handleCategoryButton = () => {
        setCategoryModal(true)
    }

    const handleAddCategory = () => {
        if (categoryName.trim().length === 0) {
            alert("Please fill out name")
            return
        }
        props.addCategory(categoryName)
        setCategoryName("")
    }

    const handleCategoryEnter = (e) => {
        if(e.key === "Enter") {
            handleAddCategory()
        }
    }

    return (
        <div>
            <button
                onClick={handleCategoryButton}
                style={{
                    border: "2px solid gainsboro",
                    borderRadius: "5px",
                    margin: "10px",
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: "white"
                }}
                data-testid="category-button"
            >
                Categories
            </button>
            {
                categoryModal && (
                    <div
                        onClick={() => setCategoryModal(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1000,
                        }}
                        data-testid="category-modal"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "white",
                                padding: "20px",
                                borderRadius: "8px",
                                transition: "all 0.3s ease",
                                animation: "slideDown 0.5s ease",
                            }}
                        >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <div style={{
                                    textAlign: "center"
                                }}>
                                    {props.categories.length-1}/10 Categories
                                </div>
                                <div style={{
                                    alignSelf: "center"
                                }}>
                                    <input
                                        placeholder="Enter Category Name"
                                        value={categoryName}
                                        onChange={handleCategoryName}
                                        style={{
                                            margin: "10px",
                                            padding: "10px"
                                        }}
                                        onKeyDown={handleCategoryEnter}
                                        maxLength={15}
                                        data-test="category-input"
                                    />
                                    <button
                                        style={{
                                            cursor: "pointer",
                                            margin: "10px",
                                            padding: "10px"
                                        }}
                                        onClick={handleAddCategory}
                                        data-testid="add-category-button"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                            <div 
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 15,
                                    backgroundColor: "whitesmoke",
                                    padding: "15px",
                                    borderRadius: "10px"
                                }}
                                data-test="category-list"
                            >
                                {
                                    props.categories.length > 1 ? (
                                        props.categories.map((category, key) => {
                                            if(category === "Unkategorisiert") {
                                                return
                                            }
                                            return (
                                                <div 
                                                    key={key} 
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <div>
                                                        {category}
                                                    </div>
                                                    <button
                                                        data-testid={`delete-${category}`}
                                                        onClick={() => props.deleteCategoryProp(category)}
                                                        style={{
                                                            borderRadius: "10px",
                                                            border: "none",
                                                            padding: "5px",
                                                            justifyContent: "flex-end"
                                                        }}
                                                    >
                                                        <FaTrash style={{ color: "orangered", fontSize: "16px", cursor: "pointer" }} />
                                                    </button>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div style={{
                                            textAlign: "center"
                                        }}>
                                            No categories
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                )
            }
        </div>
    )
}