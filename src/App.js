import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import React, {useState, useEffect} from 'react'
import AdminDashboard from '@components/admin-dashboard.js'
import axios from 'axios'
import { ColorRing } from  'react-loader-spinner'


const App = () => {
  const TARGET_URI = process.env.REACT_APP_DEV_URI;
  const {isAuthenticated, isLoading, user, getAccessTokenSilently} = useAuth0();
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showNewEmployeeModal,setShowNewEmployeeModal ] = useState(false)
  const [message, setMessage] = useState('')
  const [feedbackAlert, setFeedbackAlert] = useState(false)
  const [schedule, setSchedule] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [loadingEmployees, setLoadingEmployees] = useState(false)

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
      setLoadingEmployees(true)
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
      setLoadingEmployees(false)
    } catch (error) {console.error(error)}
  }

  useEffect(() => {
    fetchEmployeeList()
    setFeedbackAlert(true)
  },[message])

  return (
    <>
      {isLoading?
        <div className="loading-spinner">
          <ColorRing
            visible={true}
            height="140"
            width="140"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#192231', '#98878F', '#494E6B', '#56f4de', '#849b87']}
          />
        </div>
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
          setEmployeeList={setEmployeeList}
          loadingEmployees={loadingEmployees}/>
      }
    </>
  )
}

export default App;
