import React, { useState, useEffect } from 'react'
import { csv } from 'd3-fetch'
import { ascending } from 'd3-array'
import BarChart from './BarChart'

const parseNA = (string) => (string === 'NA' ? undefined : string)

function type(d) {
  return {
    genre: parseNA(d.genre),
    revenue: +d.revenue,
  }
}

function filterData(data) {
  return data.filter(d => {
    return d.revenue > 0
  })
}

function prepareBarChartData(data) {
  // usually more wrangling is required but the example data is simple
  return data
}

const BarChartData = () => {
  const [barChartData, setBarChartData] = useState(null);

  const loadBarChartData = (csvFilePath) => {
    csv(csvFilePath, type).then(data => {
      const dataClean = filterData(data)
      setBarChartData(
        prepareBarChartData(dataClean).sort((a, b) => {
          return ascending(a.genre, b.genre)
        }),
      )
    })
  }

  useEffect(() => {
    loadBarChartData('/static/data/barchart.csv');
  }, [])

  const handleLoadButtonClick = () => {
    loadBarChartData('/static/data/barchart2.csv');
  }

  if (barChartData === null) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <button onClick={handleLoadButtonClick}>Load Barchart 2</button>
      <BarChart data={barChartData} />
    </div>
  )
}

export default BarChartData
