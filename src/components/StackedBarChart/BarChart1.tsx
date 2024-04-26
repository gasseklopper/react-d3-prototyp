import React, { useState } from "react";
import { StackedBarGraph } from "./StackedBarChart";

const data = [
  {
    name: "Januar 2023",
    type: 1,
    Eigentumsdelikte: 10,
    Rauschgiftdelikte: 20,
    Gewaltdelikte: 30
  },
  {
    name: "April 2023",
    type: 1,
    Eigentumsdelikte: 50,
    Rauschgiftdelikte: 10,
    Gewaltdelikte: 20
  },
  
];

const allKeys = ["Eigentumsdelikte", "Rauschgiftdelikte", "Gewaltdelikte"];

const colors: { [key: string]: string } = {
  Eigentumsdelikte: "rgba(247, 188, 61, .8)",
  Rauschgiftdelikte: "rgba(127, 162, 196, .8)",
  Gewaltdelikte: "rgba(248, 122, 52, .8)"
};

export const D3BarGraph = () => {
  const [keys, setKeys] = useState(allKeys);
  console.log("keys" , keys)
  return (
    <div>
      {/* Pass the keys prop to the StackedBarGraph component */}
      
      <StackedBarGraph datasets={data} colors={colors} keys={keys} />
      <div className="fields" style={{ display: "flex" }}>
        {allKeys.map((key) => (
          <div key={key} className="field" style={{ display: "flex" }}>
            <input
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter((_key) => _key !== key));
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export { StackedBarGraph };
