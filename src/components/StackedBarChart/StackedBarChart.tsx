import React, { useState, useEffect, useRef, RefObject } from "react";
import {
  select,
  scaleBand,
  axisBottom,
  axisLeft,
  scaleLinear,
  stack,
  max,
  Selection,
  BaseType
} from "d3";

export const StackedBarGraph = ({ datasets, keys, colors }: any) => {
//   console.log("Keys:", keys); // Debugging statement

  const [data, setData] = useState(datasets);
  const svgRef = useRef(null);
  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current) return; // Check if wrapperRef.current is undefined
    const svg = select(svgRef.current!);
    // if (!svgRef.current) return; // Guard against undefined

    const { width, height } = wrapperRef.current.getBoundingClientRect();
    const stackGenerator = stack().keys(keys);
    const layers = stackGenerator(data);

    
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1]))
    ];
    const filteredExtent = extent.filter(value => typeof value === 'number') as number[];
    const yScale = scaleLinear().domain(filteredExtent).range([height, 0]);

    const x0Scale = scaleBand()
      .domain(data.map((d: { name: any; }) => d.name))
      .range([0, width])
      .padding(0.46);
    const x1Scale = scaleBand()
      .domain(data.map((d: { type: any; }) => d.type))
      .rangeRound([0, x0Scale.bandwidth()])
      .padding(0.12);

    const xAix = axisBottom(x0Scale);
    const yAix = axisLeft(yScale);

    (svg?.selectAll(".x-axis") as Selection<BaseType, any, SVGSVGElement, any>)
    .attr("transform", `translate(0, ${height})`)
    .call(xAix as unknown as (selection: Selection<BaseType, any, SVGSVGElement, any>) => void);
  
  (svg?.selectAll(".y-axis") as Selection<BaseType, any, SVGSVGElement, any>)
    .attr("transform", `translate(${0 + 25}, 0 )`)
    .call(yAix as unknown as (selection: Selection<BaseType, any, SVGSVGElement, any>) => void);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr("x", (sequence) => {
        if (sequence.data) {
            const name = sequence.data.name.toString(); // Ensure name is a string
            // const type = sequence.data.type.toString(); // Convert type to string
            const x0 = x0Scale(name); // Get x0 position based on the category
            // const x1 = x1Scale(type); // Get x1 position based on the subgroup
    
            // Check if both x0 and x1 are defined before returning the value
            // if (!isNaN(x0!) && !isNaN(x1!)) {
                return x0! + 25; // Combine x0 and x1 for the final x position
            // }
        }
        return 110; // Default value if sequence.data is undefined or either x0 or x1 is undefined
    })
      .attr("width", x1Scale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

    svg
      .select(".x-axis")
      .selectAll(".tick")
      .on("click", (e: any) => {
        const filteredD = data.map((d: { name: any; Eigentumsdelikt: any; Rauschgiftdelikt: any; Gewaltdelikt: any; }) => {
          return {
            name: d.name,
            Eigentumsdelikte: d.name === e ? 0 : d.Eigentumsdelikt,
            Rauschgiftdelikte: d.name === e ? 0 : d.Rauschgiftdelikt,
            Gewaltdelikte: d.name === e ? 0 : d.Gewaltdelikt
          };
        });
        setData(filteredD);
      });
  }, [data, keys, colors]);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ width: "100%", height: "400px", marginBottom: "2rem" }}
      >
        <svg ref={svgRef} style={{ width: "100%", height: "110%" }}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};
