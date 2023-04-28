import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import React, {useState, useEffect} from 'react'
import AdminDashboard from '@components/admin-dashboard.js'
import axios from 'axios'

const App = () => {
  const TARGET_URI = process.env.REACT_APP_DEV_URI;
  const {isAuthenticated, isLoading, user, getAccessTokenSilently} = useAuth0();
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showNewEmployeeModal,setShowNewEmployeeModal ] = useState(false)
  const [message, setMessage] = useState('')
  const [feedbackAlert, setFeedbackAlert] = useState(false)
  const [schedule, setSchedule] = useState([])
  const [employeeList, setEmployeeList] = useState([])

  const fetchSchedule = async () => {
    try{
      const token = await getAccessTokenSilently();
      const options = {
        method: 'GET',
        url: `${TARGET_URI}/admin/${selectedEmployee._id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(options)
      setSchedule(response.data.schedule)
    } catch(error){console.log(error)}
  }

  const fetchEmployeeList = async () => {
    try{
      const token = await getAccessTokenSilently();
      const options = {
        method: 'GET',
        url: `${TARGET_URI}/admin`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(options)
      setEmployeeList(response.data)
    } catch (error) {console.error(error)}
  }

  useEffect(() => {
    fetchEmployeeList()
    setFeedbackAlert(true)
  },[message])

  return (
    <>
      {isLoading?
        <h2 className="loading-text">Loading...</h2>
      :
        <AdminDashboard
          isAuthenticated={isAuthenticated}
          user={user}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          schedule={schedule}
          setSchedule={setSchedule}
          showNewEmployeeModal={showNewEmployeeModal}
          setShowNewEmployeeModal={setShowNewEmployeeModal}
          message={message}
          setMessage={setMessage}
          feedbackAlert={feedbackAlert}
          setFeedbackAlert={setFeedbackAlert}
          fetchSchedule={fetchSchedule}
          fetchEmployeeList={fetchEmployeeList}
          employeeList={employeeList}
          setEmployeeList={setEmployeeList}/>
      }
    </>
  )
}

export default App;
