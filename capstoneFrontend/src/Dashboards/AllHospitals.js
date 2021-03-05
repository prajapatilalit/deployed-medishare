import React, { useState, useEffect } from 'react'
import { allHospitals, signout } from '../CallingApi/patientapi'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Button } from '../Landing Page/Button'
import '../Landing Page/Navbar.css'
import './styles.css'
import './card.css'
import { Link } from 'react-router-dom'

function AllHospitals({ history }) {
  const [hospitals, setHospitals] = useState([])
  const { lat, long } = history.location.state
  useEffect(() => {
    allHospitals()
      .then((res) => {
        setHospitals(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  console.log('Allhospitals', history)

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1) // deg2rad below
    var dLon = deg2rad(lon2 - lon1)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // Distance in km
    return d
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  //for navbar
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
    window.addEventListener('resize', showButton)
    return () => {
      window.removeEventListener('resize', showButton)
    }
  }, [])
  //

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link
              to='/patient/dashboard'
              className='navbar-logo'
              onClick={closeMobileMenu}>
              Dashboard
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <div
                  className='nav-links'
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push('/patient/dashboard', history.location.state)
                    })
                  }>
                  Basic Details
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className='nav-links'
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        '/patient/dashboard/graph',
                        history.location.state
                      )
                    })
                  }>
                  Health Status
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className='nav-links'
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        '/patient/dashboard/prescription',
                        history.location.state
                      )
                    })
                  }>
                  Prescriptions
                </div>
              </li>
              <li className='nav-btn'>
                {button ? (
                  <Button
                    buttonStyle='btn--outline'
                    onClick={() => {
                      signout(() => {
                        history.push('/users/login')
                      })
                    }}>
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    buttonStyle='btn--outline'
                    buttonSize='btn--mobile'
                    onClick={
                      (closeMobileMenu,
                      () => {
                        signout(() => {
                          history.push('/users/login')
                        })
                      })
                    }>
                    Sign Out
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
      {/**<h1>View All Hospitals Here</h1>
      <button
        onClick={() => {
          history.push('/patient/dashboard')
        }}>
        Patient Dashboard{' '}
      </button> */}
      <h2
        style={{
          textAlign: 'center',
          fontSize: '30px',
          padding: '10px',
          margin: '5px auto',
        }}>
        Hospitals within your City
      </h2>
      <div className='prescription_data'>
        <ol>
          {hospitals.map((item, id) => {
            const a = getDistanceFromLatLonInKm(
              lat,
              long,
              item.location.lat,
              item.location.long
            )
            return (
              <>
                <li>
                  {' '}
                  <div className='wrap'>
                    <div className='task'>
                      <div className='abstract'>
                        <h3>{item.Name}</h3>
                        <p>{item.Specialisation}</p>
                        <p>
                          <strong>
                            {a.toFixed(3)} {a > 1 ? 'Km' : 'meters'} away
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default AllHospitals
