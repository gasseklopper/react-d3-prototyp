import React, { useState, useEffect } from 'react'
import { csv } from 'd3-fetch'
import { ascending } from 'd3-array'
import BarChart from './BarChart'

const parseNA = (string: string) => (string === 'NA' ? undefined : string)

function type(d: { genre: any; revenue: string | number }) {
  return {
    genre: parseNA(d.genre),
    revenue: +d.revenue,
  }
}

function filterData(data: any[]) {
  return data.filter((d: { revenue: number }) => {
    return d.revenue > 0
  })
}

function prepareBarChartData(data: any) {
  // usually more wrangling is required but the example data is simple
  return data
}

const BarChartData = () => {
  const [barChartData, setBarChartData] = useState(null);

  const loadBarChartData = (csvFilePath: string) => {
    csv(csvFilePath, type).then(data => {
      const dataClean = filterData(data)
      setBarChartData(
        prepareBarChartData(dataClean).sort((a: { genre: string | number | boolean | Date | undefined }, b: { genre: string | number | boolean | Date | undefined }) => {
          return ascending(a.genre, b.genre)
        }),
      )
    })
  }

  useEffect(() => {
    loadBarChartData('/static/data/barchart.csv');
  }, [])

  const handleLoadButtonClick1 = () => {
    // Clear old data
    setBarChartData(null);
    // Load new data
    loadBarChartData('/static/data/barchart2.csv');
  }

  const handleLoadButtonClick2 = () => {
    // Clear old data
    setBarChartData(null);
    // Load new data
    loadBarChartData('/static/data/barchart.csv');
  }

  if (barChartData === null) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <button onClick={handleLoadButtonClick2}>Load Barchart 2</button>
      <button onClick={handleLoadButtonClick1}>Load Barchart 1</button>
      <BarChart data={barChartData} />
    </div>
  )
}

export default BarChartData
