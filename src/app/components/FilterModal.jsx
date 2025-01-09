import { useState } from "react"

import plus from "./assets/plus.svg"
import minus from "./assets/minus.svg"
import Image from "next/image"

export default function FilterModal(props) {

    const [showPriority, setShowPriority] = useState(props.filters.priority.length !== 0)
    const [showExpiration, setShowExpiration] = useState(props.filters.expiration.length !== 0)
    const [showCategory, setShowCategory] = useState(props.filters.category.length !== 0)

    const isSameFilter = (type, filter) => {
        return props.filters[type] === filter
    }

    const handleShowPriority = () => {
        setShowPriority(!showPriority)
    }

    const handleShowExpiration = () => {
        setShowExpiration(!showExpiration)
    }

    const handleShowCategory = () => {
        setShowCategory(!showCategory)
    }

    const handlePriorityChange = (priority) => {
        const newPriority = isSameFilter("priority", priority) ? "" : priority;
        props.handleFilterChange("priority", newPriority);
    }

    const handleExpirationChange = (expiration) => {
        const newExpiration = isSameFilter("expiration", expiration) ? "" : expiration;
        props.handleFilterChange("expiration", newExpiration);
    }

    const handleCategoryChange = (category) => {
        const newCategory = isSameFilter("category", category) ? "" : category;
        props.handleFilterChange("category", newCategory);
    }

    const clearAllFilters = () => {
        props.handleFilterChange("category", "");
        props.handleFilterChange("expiration", "");
        props.handleFilterChange("priority", "");
    }

    return (
        <div
            onClick={props.hideModal}
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "flex-start"
            }}
            data-test="hide-filter-modal"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "whitesmoke",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                    height: "100vh",
                    maxWidth: "300px",
                    width: "90%",
                    transition: "all 0.3s ease",
                    animation: "slideRight 0.5s ease",
                }}
                data-testid="filter-modal"
            >
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "20px",
                    gap: 5
                }}>
                    <div style={{
                        textAlign: "center",
                        fontSize: "25px"
                    }}>
                        <strong>Filters</strong>
                    </div>
                    <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
                    <div className="unselectable">
                        <div
                            onClick={handleShowPriority}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                fontSize: "20px"
                            }}
                            data-testid="priority-filter"
                        >
                            <Image src={showPriority ? minus : plus} alt="" height={30} width={30} />
                            Priority
                        </div>
                        <div style={{
                            
                        }}>
                            {
                                showPriority && (
                                    <div
                                        style={{
                                            marginLeft: "20px",
                                            marginRight: "20px",
                                        }}
                                        data-testid="priority-filter-list"
                                    >
                                        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
                                        {
                                            ["Low", "Medium", "High"].map((priority, key) => (
                                                <div
                                                    onClick={() => handlePriorityChange(priority)}
                                                    key={key}
                                                    style={{
                                                        cursor: "pointer",
                                                        fontWeight: priority === props.filters.priority ? "bold" : "normal"
                                                    }}
                                                    className="unselectable"
                                                    data-test={`priority-${priority}`}
                                                >
                                                    {priority}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="unselectable">
                        <div
                            onClick={handleShowExpiration}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                fontSize: "20px"
                            }}
                            data-testid="expiration-filter"
                        >
                            <Image src={showExpiration ? minus : plus} alt="" height={30} width={30} />
                            Expiration
                        </div>
                        <div>
                            {
                                showExpiration && (
                                    <div style={{
                                        marginLeft: "20px",
                                        marginRight: "20px",
                                    }}>
                                        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
                                        {
                                            ["Ascend", "Descend"].map((expiration, key) => (
                                                <div
                                                    onClick={() => handleExpirationChange(expiration)}
                                                    key={key}
                                                    style={{
                                                        cursor: "pointer",
                                                        fontWeight: expiration === props.filters.expiration ? "bold" : "normal"
                                                    }}
                                                    className="unselectable"
                                                    data-test={`expiration-${expiration}`}
                                                >
                                                    {expiration}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="unselectable">
                        <div
                            onClick={handleShowCategory}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                fontSize: "20px"
                            }}
                            data-testid="category-filter"
                        >
                            <Image src={showCategory ? minus : plus} alt="" height={30} width={30} />
                            Category
                        </div>
                        <div>
                            {
                                showCategory && (
                                    <div
                                        style={{
                                            marginLeft: "20px",
                                            marginRight: "20px",
                                        }}
                                        data-testid="category-filter-list"
                                    >
                                        <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
                                        {
                                            props.categories.map((category, key) => (
                                                <div
                                                    onClick={() => handleCategoryChange(category)}
                                                    key={key}
                                                    style={{
                                                        cursor: "pointer",
                                                        fontWeight: category === props.filters.category ? "bold" : "normal"
                                                    }}
                                                    data-test={`category-${category}`}
                                                >
                                                    {category}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => clearAllFilters()}
                    style={{
                        bottom: 0,
                        position: "absolute",
                        margin: "15px",
                        cursor: "pointer"
                    }}
                    className="unselectable"
                >
                    Clear All Filters
                </div>
            </div>
        </div>
    )
}