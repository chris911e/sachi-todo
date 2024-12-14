import { useState } from "react"

import plus from "./assets/plus.svg"
import minus from "./assets/minus.svg"
import Image from "next/image"

export default function FilterModal(props) {

    const [showPriority, setShowPriority] = useState(props.filters.priority.length !== 0)
    const [showExpiration, setShowExpiration] = useState(props.filters.expiration.length !== 0)
    const [showCategory, setShowCategory] = useState(props.filters.category.length !== 0)

    const isFilterSet = (filter) => {
        return props.filters[filter].length > 0
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
        const newPriority = isFilterSet("priority") ? "" : priority;
        props.handleFilterChange("priority", newPriority);
    }

    const handleExpirationChange = (expiration) => {
        const newExpiration = isFilterSet("expiration") ? "" : expiration;
        props.handleFilterChange("expiration", newExpiration);
    }

    const handleCategoryChange = (category) => {
        const newCategory = isFilterSet("category") ? "" : category;
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
                    <div>
                        <div
                            onClick={handleShowPriority}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                fontSize: "20px"
                            }}
                        >
                            <Image src={showPriority ? minus : plus} alt="" height={30} width={30} />
                            Priority
                        </div>
                        <div style={{
                            
                        }}>
                            {
                                showPriority && (
                                    <div style={{
                                        marginLeft: "20px",
                                        marginRight: "20px",
                                    }}>
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
                    <div>
                        <div
                            onClick={handleShowExpiration}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                fontSize: "20px"
                            }}
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
                    <div>
                        <div
                            onClick={handleShowCategory}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                fontSize: "20px"
                            }}
                        >
                            <Image src={showCategory ? minus : plus} alt="" height={30} width={30} />
                            Category
                        </div>
                        <div>
                            {
                                showCategory && (
                                    <div style={{
                                        marginLeft: "20px",
                                        marginRight: "20px",
                                    }}>
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
                >
                    Clear All Filters
                </div>
            </div>
        </div>
    )
}