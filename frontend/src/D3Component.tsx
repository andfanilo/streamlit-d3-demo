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

interface TooltipProps {
    x: number
    y: number
    datum: number
}

const Tooltip = (props: TooltipProps) => {
    return <div/>
}

const buildScales = (args: PythonArgs) => {
    const {svgWidth, svgHeight, margin, data}: PythonArgs = args

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d: any) => d[0])])
        .range([margin.left, svgWidth - margin.right])
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d: any) => d[1])])
        .range([svgHeight - margin.bottom, margin.top])

    return [xScale, yScale]
}

const D3Component = (props: ComponentProps) => {

    const ref = useRef(null)
    const {svgWidth, svgHeight, margin, data}: PythonArgs = props.args
    const transitionMillisec = 1200

    // on mount, create containers for circles, line and axis
    useEffect(() => {
        const svgElement = d3.select(ref.current)
        svgElement.append("g").classed('circles', true)
        svgElement.append("g").classed('line', true)
        svgElement.append("g")
            .classed('x-axis', true)
        svgElement.append("g")
            .classed('y-axis', true)
    }, [])

    // create / update axis
    useEffect(() => {
        const svgElement = d3.select(ref.current)
        const [xScale, yScale] = buildScales(props.args)

        const xAxis = (g: any) => g.attr("transform", `translate(0, ${svgHeight - margin.bottom})`)
            .transition().duration(transitionMillisec)
            .call(d3.axisBottom(xScale))
        const yAxis = (g: any) => g.attr("transform", `translate(${margin.left}, 0)`)
            .transition().duration(transitionMillisec)
            .call(d3.axisLeft(yScale))

        svgElement.select(".x-axis").call(xAxis);
        svgElement.select(".y-axis").call(yAxis);
    })

    // create / update circles
    useEffect(() => {
        const svgElement = d3.select(ref.current)
        const [xScale, yScale] = buildScales(props.args)

        svgElement.select(".circles").selectAll("circle")
            .data(data, (d: any) => d)
            .join(
                enter => (
                    enter.append("circle")
                        .attr("cx", (d: any) => xScale(d[0]))
                        .attr("cy", (d: any) => yScale(d[1]))
                        .attr("fill", "cornflowerblue")
                        .attr("r", 0)
                        .call(el =>
                            el.transition().duration(transitionMillisec)
                                .attr("r", 15)
                        )
                ),
                update => update.call(el =>
                    el.transition().duration(transitionMillisec)
                        .attr("cy", (d: any) => yScale(d[1]))
                        .attr("r", 15)
                ),
                exit => (
                    exit.call(el =>
                        el.transition().duration(transitionMillisec / 2)
                            .attr("r", 0)
                            .attr("fill", "tomato")
                            .style("opacity", 0)
                            .remove()
                    )
                ),
            )
    })

    // create / update line
    useEffect(() => {
        const svgElement = d3.select(ref.current)
        const [xScale, yScale] = buildScales(props.args)

        const line = d3.line()
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]))

        svgElement.select(".line").selectAll("path")
            .data([data]) // array with 1 element it's keyed by index, enters once then updates
            .join(
                enter => enter.append("path")
                    .attr("d", (d: any) => line(d))
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("opacity", 0)
                    .call(el => el.transition().duration(transitionMillisec)
                        .attr("opacity", 1)
                    ),
                update => update
                    .attr("opacity", 0.2)
                    .call(el =>
                        el.transition().duration(transitionMillisec)
                            .attr("d", (d: any) => line(d)).attr("opacity", 1)
                    ),
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
