import React, {useEffect, useRef} from "react"
import {ComponentProps, Streamlit, withStreamlitConnection,} from "./streamlit"
import * as d3 from "d3";

interface d3Margin {
    top: number
    bottom: number
    left: number
    right: number
}

interface PythonArgs {
    svgWidth: number
    svgHeight: number
    margin: d3Margin
    data: Array<Array<[number, number]>>
}

const D3Component = (props: ComponentProps) => {

    const ref = useRef(null)
    const {svgWidth, svgHeight, margin, data}: PythonArgs = props.args

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d: any) => d[0])])
        .range([margin.left, svgWidth - margin.right])
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d: any) => d[1])])
        .range([svgHeight - margin.bottom, margin.top])
    const line = d3.line()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]))

    // on mount, create containers for circles, line and axis
    useEffect(() => {
        const svgElement = d3.select(ref.current)
        svgElement.append("g").classed('circles', true)
        svgElement.append("g").classed('line', true)
        svgElement.append("g")
            .classed('xAxis', true)
            .attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
        svgElement.append("g")
            .classed('yAxis', true)
            .attr("transform", `translate(${margin.left}, 0)`)
    }, [margin.bottom, margin.left, svgHeight])

    // update axis
    useEffect(() => {
        const svgElement = d3.select(ref.current)

        const xAxis = (g: any) => g.call(d3.axisBottom(xScale))
        const yAxis = (g: any) => g.call(d3.axisLeft(yScale))

        svgElement.select(".xAxis").transition().duration(1200).call(xAxis);
        svgElement.select(".yAxis").transition().duration(1200).call(yAxis);
    }, [xScale, yScale])

    // update data
    useEffect(() => {
        const svgElement = d3.select(ref.current)

        // update circles
        svgElement.select(".circles").selectAll("circle")
            .data(data, (d: any) => d)
            .join(
                enter => (
                    enter.append("circle")
                        .attr("cx", (d: any) => xScale(d[0]))
                        .attr("cy", (d: any) => yScale(d[1]))
                        .attr("r", 0)
                        .attr("fill", "lightgrey")
                        .call(enter => (
                            enter.transition().duration(1200)
                                .attr("r", 15)
                                .attr("fill", "cornflowerblue")
                                .style("opacity", 1)
                        ))
                ),
                update => update,
                exit => (
                    exit.attr("fill", "tomato")
                        .call(exit => (
                            exit.transition().duration(600)
                                .attr("r", 0)
                                .attr("fill", "lightgrey")
                                .style("opacity", 0)
                                .remove()
                        ))
                ),
            )

        // update line
        svgElement.select(".line").selectAll("path")
            .data([data], (d: any) => d)
            .join(
                enter => enter.append("path")
                    .attr("d", (d: any) => line(d))
                    .attr("stroke", "black")
                    .attr("fill", "none"),
                update => update,
                exit => exit.remove()
            )
    })

    // just in case, update height
    useEffect(() => {
        Streamlit.setFrameHeight()
    }, [svgHeight])

    return (
        <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            ref={ref}
        />
    )
}

export default withStreamlitConnection(D3Component)
