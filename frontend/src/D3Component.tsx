import React, {useEffect, useRef} from "react"
import {ComponentProps, Streamlit, withStreamlitConnection,} from "./streamlit"
import * as d3 from "d3";

const D3Component = (props: ComponentProps) => {

    const ref = useRef(null);

    useEffect(() => {
        const svgElement = d3.select(ref.current)
        svgElement.append("circle")
            .attr("cx", 150)
            .attr("cy", 70)
            .attr("r", 50)
    }, [])

    useEffect(() => {
        Streamlit.setFrameHeight()
    })

    return (
        <svg
            ref={ref}
        />
    )
}

export default withStreamlitConnection(D3Component)
