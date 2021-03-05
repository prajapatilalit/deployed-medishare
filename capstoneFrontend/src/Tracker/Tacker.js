import React from 'react'
import { useEffect, useState } from 'react'
import axios from './axios'
import CovidSummary from './CovidSummary'
import LineGraph from './LineGraph'
import './tracker.css'

export default function Tracker() {
  const [totalConfirmed, setTotalConfirmed] = useState(0)
  const [totalRecovered, setTotalRecovered] = useState(0)
  const [totalDeaths, setTotalDeaths] = useState(0)
  const [covidSummary, setCovidSummary] = useState({})
  const [days, setDays] = useState(7)
  const [country, setCountry] = useState('')
  const [coronaCountAr, setCoronaCountAr] = useState([])
  const [label, setLabel] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('/summary')
      .then((res) => {
        console.log(res)
        setLoading(false)
        if (res.status === 200) {
          setTotalConfirmed(res.data.Global.TotalConfirmed)
          setTotalRecovered(res.data.Global.TotalRecovered)
          setTotalDeaths(res.data.Global.TotalDeaths)
          setCovidSummary(res.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const formatDate = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = `0${d.getMonth() + 1}`.slice(-2)
    const _date = d.getDate()
    return `${year}-${month}-${_date}`
  }

  const countryHandler = (e) => {
    setCountry(e.target.value)
    const d = new Date()
    const to = formatDate(d)
    const from = formatDate(d.setDate(d.getDate() - days))
    console.log(to, from)
    getCoronaReportByDateRange(e.target.value, from, to)
  }

  const daysHandler = (e) => {
    setDays(e.target.value)
    const d = new Date()
    const to = formatDate(d)
    const from = formatDate(d.setDate(d.getDate() - e.target.value))
    getCoronaReportByDateRange(country, from, to)
  }

  const getCoronaReportByDateRange = (countrySlug, from, to) => {
    axios
      .get(
        `https://api.covid19api.com/total/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        console.log(res)
        const yAxisCoronaCount = res.data.map((d) => d.Cases)
        const xAxisLabel = res.data.map((d) => d.Date)

        const covidDetails = covidSummary.Countries.find(
          (country) => country.Slug === countrySlug
        )

        setCoronaCountAr(yAxisCoronaCount)
        setTotalConfirmed(covidDetails.TotalConfirmed)
        setTotalRecovered(covidDetails.TotalRecovered)
        setTotalDeaths(covidDetails.TotalDeaths)
        setLabel(xAxisLabel)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (loading === true) {
    return <p>Fetching data from server ...</p>
  }
  return (
    <div className='tracker'>
      <CovidSummary
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
        country={country}
      />
      <div>
        <select value={country} onChange={countryHandler}>
          <option value=''>Select Country</option>
          {covidSummary.Countries &&
            covidSummary.Countries.map((country) => (
              <option key={country.Slug} value={country.Slug}>
                {country.Country}
              </option>
            ))}
        </select>
        <select value={days} onChange={daysHandler} style={{ margin: '5px' }}>
          <option value='7'>Last 7 days</option>
          <option value='30'>Last 30 days</option>
          <option value='90'>Last 90 days</option>
        </select>
      </div>
      <LineGraph yAxis={coronaCountAr} label={label} />
    </div>
  )
}
