import { useEffect, useRef } from 'react'
import { BaseType, select, Selection } from 'd3-selection';
import { max } from 'd3-array'
import { scaleLinear, scaleBand } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'

// margin convention often used with D3
const margin = { top: 80, right: 60, bottom: 80, left: 60 }
const width = 600 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom

const color = ['#f05440', '#d5433d', '#b33535', '#283250']

interface DataItem {
    genre: string;
    revenue: number;
}

const BarChart: React.FC<{ data: DataItem[] }> = ({ data }) => {
    const d3svg = useRef<SVGSVGElement>(null)

    useEffect(() => {
        if (data && d3svg.current) {
            // Creating SVG element directly
            const svg = select<SVGSVGElement, unknown>(d3svg.current)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            // scales
            const xMax = max(data, (d: { revenue: number }) => d.revenue)
            const defaultValue = 1

            const xMaxOrDefault = xMax || defaultValue; // Provide a default value if xMax is undefined
            const xScale = scaleLinear()
                .domain([0, xMaxOrDefault])
                .range([0, width]);

            const yScale = scaleBand()
                .domain(data.map((d: { genre: any }) => d.genre))
                .rangeRound([0, height])
                .paddingInner(0.25)

            // draw header
            svg
                .append('g')
                .attr('class', 'bar-header')
                .attr('transform', `translate(0, ${-margin.top / 2})`)
                .append('text')
                .append('tspan')
                .text('Horizontal bar chart')

            // draw bars
            svg
                .selectAll('.bar')
                .data<DataItem>(data) // Explicitly specify the type here
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('y', (d: DataItem) => yScale(d.genre) || 0)
                .attr('width', d => xScale(d.revenue))
                .attr('height', yScale.bandwidth())
                .style('fill', function (d, i) {
                    return color[i % 4] // use colors in sequence
                })

            // draw axes
            const xAxis = axisBottom(xScale)
            svg
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0,${height + margin.bottom / 3})`)
                .call(xAxis)

            const yAxis = axisLeft(yScale).tickSize(0)
            svg
                .append('g')
                .attr('class', 'y axis')
                .attr('transform', `translate(${-margin.left / 3},0)`)
                .call(yAxis)
        }
    }, [data])

    return (
        <svg
            className="bar-chart-container"
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
            role="img"
            ref={d3svg}
        ></svg>
    )
}

export default BarChart