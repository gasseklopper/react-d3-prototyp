import { useState, useEffect } from 'react'
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
  return data.filter(d => {
    return d.revenue > 0
  })
}

function prepareBarChartData(data: any[]) {
  // usually more wrangling is required but the example data is simple
  return data
}

const BarChartData = () => {
  const [barChartData, setBarChartData] = useState<null | any[]>(null);
  useEffect(() => {
    csv('/static/data/barchart.csv', type).then(data => {
      const dataClean = filterData(data)
      setBarChartData(
        prepareBarChartData(dataClean).sort((a, b) => {
          return ascending(a.genre, b.genre)
        }),
      )
    })
  }, [])

  if (barChartData === null) {
    return <p>Loading...</p>
  }

  return <BarChart data={barChartData} />
}

export default BarChartData