import React, { useState, useEffect } from 'react'
import { signout } from '../CallingApi/patientapi'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Button } from '../Landing Page/Button'
import '../Landing Page/Navbar.css'
import { Link } from 'react-router-dom'
import { getPres } from '../CallingApi/patientapi'
import './styles.css'

function OrgPrescription({ history }) {
  // console.log(history.location.state.userinfo?.UID)
  const [presData, setPresData] = useState([])
  const [dataReceived, setDataReceived] = useState(false)

  useEffect(() => {
    getPres(history.location.state.userinfo?.UID)
      .then((data) => {
        console.log(data)
        setPresData(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
    setDataReceived(true)
  }, [])

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
              to='/org/dashboard'
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
                      history.push('/org/allDetails', history.location.state)
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
                        '/org/dashboard/graph',
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
                        '/org/dashboard/prescription',
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
      {/*<h1>View Prescription Here</h1>
      <button
        onClick={() => {
          history.push('/org/dashboard')
        }}>
        Organisation Dashboard
      </button>
      <button
        onClick={() => {
          history.push('/org/allDetails', history.location.state)
        }}>
        Organisation all details Dashboard
      </button>*/}
      <div>
        {presData ? (
          <div className='prescription_data'>
            <ol>
              {presData.map((data, i) => {
                const val = data.medDetails.map((innerData, i) => {
                  return (
                    <li>
                      <div className='wrap'>
                        <div className='task'>
                          <div className='abstract'>
                            <h3>
                              No of Medication Prescribed:{' '}
                              {data.medDetails.length}
                            </h3>{' '}
                            <p>
                              <strong>Medicine Name : </strong>
                              {innerData.med_name} <br />
                              <strong> Duration : </strong>
                              {innerData.duration}
                            </p>
                            <p>
                              <strong>Dosage : </strong>
                              {innerData.Morning_dosage}{' '}
                              {innerData.Evening_dosage}
                            </p>
                          </div>
                          {i === 0 ? (
                            <div className='details'>
                              <div className='details__inner'>
                                <h3>Prescribed by : Dr. {data.Doctor} </h3>
                                <p>
                                  Data {`&`} Time : {data.createdAt}
                                </p>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                          {console.log(i, innerData.med_name)}
                        </div>
                      </div>
                    </li>
                  )
                })
                return val
              })}
            </ol>
          </div>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </div>
  )
}

export default OrgPrescription
