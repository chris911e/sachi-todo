import { useState } from "react"

export default function Priority(props) {
    const severities = [
        "low",
        "medium",
        "critical"
    ]

    const colors = [
        "blue",
        "orange",
        "red"
    ]

    const Dot = (props) => {
        return (
            <div
                style={{
                    width: "20px",
                    height: "20px",
                    color: colors[props.severity]
                }}
            />
        )
    }

    const [showTooltip, setShowTooltip] = useState(false)
    const [currentSeverity, setCurrentSeverity] = useState(0)

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div
        >
            
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {
                    showTooltip && (
                        <span>
                            {severities[currentSeverity]}
                        </span>
                    )
                }
                <Dot
                    severity={currentSeverity}
                />
            </div>

        </div>
    );
}