import React from 'react'
import Card from './Card'
import NumberFormat from 'react-number-format'

function CovidSummary(props) {
  const { totalConfirmed, totalRecovered, totalDeaths, country } = props
  return (
    <div>
      <div>
        <h1 style={{ textTransform: 'capitalize', color: 'black' }}>
          {country === '' ? 'Global Corona Report' : country}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card>
            <span>Total Confirmed</span>
            <br />
            <span>
              {
                <NumberFormat
                  value={totalConfirmed}
                  displayType='text'
                  thousandSeparator=','
                />
              }
            </span>
          </Card>
          <Card>
            <span>Total Recovered</span>
            <br />
            <span>
              {
                <NumberFormat
                  value={totalRecovered}
                  displayType='text'
                  thousandSeparator=','
                />
              }
            </span>
          </Card>
          <Card>
            <span>Total Deaths</span>
            <br />
            <span>
              {
                <NumberFormat
                  value={totalDeaths}
                  displayType='text'
                  thousandSeparator=','
                />
              }
            </span>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CovidSummary
