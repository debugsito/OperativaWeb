import React from 'react'
import AnimatedNumber from "react-animated-number"

export default function AnimatedCounter({ number, duration }) {

    return (
        <AnimatedNumber
            component="text"
            value={number}
            style={{
                fontSize: "2.8rem",
                color: "#E20613",
                fontWeight: 500,
            }}
            formatValue={(n) => n.toFixed(0)}
            duration={duration}
        />
    )
}
