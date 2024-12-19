import { useEffect, useState } from "react";

export default function Priority(props) {
    const severities = ["low", "medium", "high"];
    const colors = ["RoyalBlue", "LightSalmon", "IndianRed"];

    const [hovered, setHovered] = useState(false);
    const [currentPriority, setCurrentPriority] = useState(props.priority)

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleChangePriority = () => {
        var newPriority
        if(currentPriority === 2) {
            newPriority = 0
        } else {
            newPriority = currentPriority + 1
        }
        setCurrentPriority(newPriority)
    }

    useEffect(() => {
        props.handlePriorityChange(props.id, currentPriority)
    }, [currentPriority])

    const Dot = ({ severity }) => {
        return (
            <div
                onClick={handleChangePriority}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: colors[severity],
                    borderRadius: "50%",
                    cursor: "pointer"
                }}
                data-testid={`priority-todo-${props.id}`}
            ></div>
        );
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "50px",
                    height: "50px",
                    position: "relative",
                }}
            >
                {hovered && (
                    <span
                        style={{
                            position: "absolute",
                            top: "-10px",
                            fontSize: "15px",
                            backgroundColor: "white",
                            padding: "2px 5px",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                        }}
                        data-testid={`priority-todo-severity-${props.id}`}
                    >
                        {severities[currentPriority]}
                    </span>
                )}
                <Dot severity={currentPriority} />
            </div>
        </div>
    );
}
