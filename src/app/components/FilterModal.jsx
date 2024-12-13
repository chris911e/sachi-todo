import { useState } from "react"

import plus from "./assets/plus.svg"
import minus from "./assets/minus.svg"
import Image from "next/image"

export default function FilterModal(props) {

    const [showPriority, setShowPriority] = useState(false)
    const [showExpiration, setShowExpiration] = useState(false)
    const [showCategory, setShowCategory] = useState(false)

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
                    width: "90%"
                }}
            >
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "5px",
                    gap: 5
                }}>
                    <div style={{
                        textAlign: "center"
                    }}>
                        <strong>Filters</strong>
                    </div>
                    <hr style={{ margin: "10px 0", border: "1px solid #ccc" }} />
                    <div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer"
                        }}>
                            {
                                showPriority ? (
                                    <Image src={minus} alt="plus" height={25} width={25} />
                                ) : (
                                    <Image src={plus} alt="plus" height={25} width={25} />
                                )
                            }
                            Priority
                        </div>
                        <div>
                            {
                                showPriority && (
                                    <div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div>
                        Expiration
                    </div>
                    <div>
                        Category
                    </div>
                </div>
            </div>
        </div>
    )
}