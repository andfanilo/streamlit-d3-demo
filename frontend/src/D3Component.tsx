import React, {useEffect, useRef} from "react"
import {ComponentProps, Streamlit, withStreamlitConnection,} from "./streamlit"
import * as d3 from "d3";

import styles from './D3Component.module.css'

/**
 * Margin between svg container and D3 graph bounds
 */
interface d3Margin {
    top: number
    bottom: number
    left: number
    right: number
}

/**
 * Arguments Streamlit receives from the Python side
 */
interface PythonArgs {
    svgWidth: number
    svgHeight: number
    margin: d3Margin
    data: Array<Array<[number, number]>>
}

/**
 * Build D3 scales from data
 */
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

    const svgRef = useRef(null)
    const {svgWidth, svgHeight, margin, data}: PythonArgs = props.args
    const transitionMillisec = 1200

    // On mount, create group containers for circles, path and both axis
    useEffect(() => {
        const svgElement = d3.select(svgRef.current)
        svgElement.append("g").classed('circles', true)
        svgElement.append("g").classed('line', true)
        svgElement.append("g").classed('x-axis', true)
        svgElement.append("g").classed('y-axis', true)
    }, [])

    // Hook to create / update axis
    useEffect(() => {
        const svgElement = d3.select(svgRef.current)
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

    // Hook to create / update circles
    useEffect(() => {
        const svgElement = d3.select(svgRef.current)
        const [xScale, yScale] = buildScales(props.args)

        svgElement.select(".circles").selectAll("circle")
            .data(data, (d: any) => d)
            .join(
                enter => (
                    enter.append("circle")
                        // Bind each circle to [x,y] coordinate
                        .classed(styles.circle, true)
                        .attr("cx", (d: any) => xScale(d[0]))
                        .attr("cy", (d: any) => yScale(d[1]))
                        .attr("fill", "cornflowerblue")
                        .attr("r", 0)
                        // Transition from invisible to visible circle
                        .call(el => el.transition().duration(transitionMillisec).attr("r", 15))
                        // Add d3 mouseover to display and move tooltip around
                        .on("mouseover", (d: any, i, ns) => {
                            const [x, y] = d3.mouse(ns[i])
                            d3.select(".tooltip")
                                .attr("hidden", null)
                                .style("left", `${x}px`)
                                .style("top", `${y}px`)
                                .text(`Data : ${d}`)
                        })
                        .on("mouseout", _ => {
                            d3.select(".tooltip").attr("hidden", true)
                        })
                ),
                update => update.call(el =>
                    // If circle has not changed coordinates, maybe data scale changed
                    // so transition from original position to new position
                    el.transition().duration(transitionMillisec)
                        .attr("cy", (d: any) => yScale(d[1]))
                        // NB : keep radius value, it seems in Streamlit lifecycle there are 2 renders when mounting ?
                        // so circles enter and during transition to full radius rerender
                        // so if r < 15 while update then animation breaks and circle stay small for first render
                        .attr("r", 15)
                ),
                exit => (
                    // Close tooltip and remove mouse events
                    exit.dispatch("mouseout")
                        .on("mouseover", null)
                        .on("mouseout", null)
                        // Transition from visible to invisible circle then remove entirely
                        .call(el =>
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
        const svgElement = d3.select(svgRef.current)
        const [xScale, yScale] = buildScales(props.args)

        const line = d3.line()
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]))

        svgElement.select(".line").selectAll("path")
            .data([data]) // array with 1 element keyed by index, so enters once then only updates
            .join(
                enter => enter.append("path")
                    .attr("d", (d: any) => line(d))
                    .attr("stroke", "black")
                    .attr("fill", "none")
                    .attr("opacity", 0)
                    .call(el => el.transition().duration(transitionMillisec).attr("opacity", 1)),
                update => update
                    .attr("opacity", 0.2)
                    .call(el =>
                        el.transition().duration(transitionMillisec)
                            .attr("d", (d: any) => line(d))
                            .attr("opacity", 1)
                    ),
            )
    })

    // just in case, update height
    useEffect(() => {
        Streamlit.setFrameHeight()
    }, [svgHeight])

    return (
        <div>
            <div className={`${styles.tooltip} tooltip`} hidden={true}/>
            <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                ref={svgRef}
            />
        </div>
    )
}

export default withStreamlitConnection(D3Component)
