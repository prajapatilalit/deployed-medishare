import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addPrescription, getPres, signout } from '../CallingApi/patientapi'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Button } from '../Landing Page/Button'
import '../Landing Page/Navbar.css'

function Prescription({ history }) {
  const histor = history.location.state
  const [inputList, setInputList] = useState([{ med_name: '', duration: '' }])
  const [finalList, setFinalList] = useState({})
  const [result, setResult] = useState({ success: '', error: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    getPres(history.location.state.userinfo.UID)
      .then((res) => {
        console.log('USEEFFTCT', res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [history.location.state.userinfo.UID])

  // useEffect(() => {
  //    console.log("UID",history.location.state.userinfo.UID);

  // }, [inputList])

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const UID = history.location.state.userinfo.UID
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }
  const doc = JSON.parse(localStorage.getItem('jwt'))
  console.log(doc.user.doctor_name)
  const onsubmits = (e) => {
    e.preventDefault()
    var val = []
    val[0] = history.location.state.userinfo.UID
    // UID : val[0]
    var final_result
    final_result = {
      Doctor: doc.user.doctor_name,
      UID: val[0],
      medDetails: [...inputList],
    }
    setFinalList(final_result)
    addPrescription(final_result)
      .then((res) => {
        setMessage(res.message)
      })
      .catch((err) => console.log('ERROR', err))
  }

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { med_name: '', duration: '' }])
  }

  const Patient_name = history?.location.state.userinfo.patient_name

  console.log('Prescription', { history })

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
              to='/doctor/dashboard'
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
                      history.push(
                        '/doctor/AddingFeatures',
                        history.location.state
                      )
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
                        '/doctor/AddingFeatures/graph',
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
                        '/doctor/AddingFeatures/prescription',
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
      {/**<h1>Add Prescription Here</h1>
      <Link to='/doctor/dashboard'>
        {' '}
        <button>Go back To Dashboard</button>{' '}
      </Link>
      <button
        onClick={() => {
          history.push('/doctor/AddingFeatures', history.location.state)
        }}>
        Go back Upload Panal
      </button>

      <br></br> */}
      {/** <h3>
        Check {Patient_name}'s Previous Prescription{' '}
        <button
          onClick={() => {
            history.push('/doctor/previousPrescriptions', histor)
          }}>
          Check Previous Prescriptions
        </button>{' '}
      </h3>*/}
      <div className='wrapper' style={{ maxWidth: 800 }}>
        <div className='title'>Enter Prescription</div>
        {inputList.map((x, i) => {
          return (
            <div className='form'>
              <input
                name='MedicineName'
                placeholder='Medicine Name'
                value={x.MedicineName}
                onChange={(e) => handleInputChange(e, i)}
              />
              <input
                style={{ marginLeft: 20 }}
                name='Duration'
                placeholder='Duration(In Days)'
                value={x.Duration}
                onChange={(e) => handleInputChange(e, i)}
              />
              <select
                style={{ marginLeft: 20 }}
                name='Morning_dosage'
                id='dosage'
                onChange={(e) => handleInputChange(e, i)}>
                <option value='select'>Morning Dosage</option>
                <option value='Morining - 1'>1</option>
                <option value='Morining - 2'>2</option>
                <option value='Morining - 3'>3</option>
              </select>
              <select
                style={{ marginLeft: 20 }}
                name='Evening_dosage'
                id='dosage'
                onChange={(e) => handleInputChange(e, i)}>
                <option value='select'>Evening Dosage</option>
                <option value='Evening - 1'>1</option>
                <option value='Evening - 2'>2</option>
                <option value='Evening - 3'>3</option>
              </select>
              <div>
                {inputList.length !== 1 && (
                  <button
                    style={{ margin: 20 }}
                    className='box-btn'
                    onClick={() => handleRemoveClick(i)}>
                    Remove
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button
                    className='box-btn'
                    style={{ margin: 20 }}
                    onClick={handleAddClick}>
                    + Medication
                  </button>
                )}
              </div>
            </div>
          )
        })}
        <div className='form'>
          <div className='inputfield'>
            <button className='btn' onClick={onsubmits}>
              Submit
            </button>
          </div>
          <div className='inputfield'>
            <button
              className='btn'
              onClick={() => {
                history.push('/doctor/previousPrescriptions', histor)
              }}>
              Check {Patient_name}'s Previous Prescription
            </button>
          </div>
        </div>
        {/*<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
        {JSON.stringify(finalList)}*/}
        <p style={{ color: 'green', font: 'bold' }}>{result.success}</p>
      </div>
      {/*<p> {result.success ? <p> {result.success}</p> : ''} </p>*/}
      {/* {JSON.stringify(result)} */}

      {/* <h1> {result.success ? <p>  {result.success}</p> : ""  }  </h1> */}
      {/* {JSON.stringify(result)} */}
    </div>
  )
}

export default Prescription
