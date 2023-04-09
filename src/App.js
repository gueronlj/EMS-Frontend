import './App.css'
import { useAuth0} from '@auth0/auth0-react'
import React, {useState, useEffect} from 'react'
import Login from '@components/Buttons/login.js'
import Logout from '@components/Buttons/logoutButton.js'
import Profile from '@components/simple-profile.js'
import EmployeeList from '@components/Employees/employee-list.js'
import QuickMenu from '@components/quick-menu.js'
import Modal from './components/modal.js'
import AddEmployeeButton from '@components/Buttons/new-employee-button.js'
import EventForm from '@components/Schedule/event-form.js'
import EmployeeEditForm from '@components/Employees/employee-edit-form.js'
import NewEmployeeForm from '@components/Employees/employee-new-form.js'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import axios from 'axios'
// import {useAxiosRequest} from './components/hooks/useAxiosRequest.js'

const App = () => {
   const TARGET_URI = process.env.REACT_APP_DEV_URI;
   const {isAuthenticated, isLoading, user} = useAuth0();
   const [employeeList, setEmployeeList] = useState([])
   const [selectedEmployee, setSelectedEmployee] = useState(null)
   const [editMode, setEditMode] =useState(false)
   const [eventForm, setEventForm] = useState(false)
   const [schedule, setSchedule] = useState([])
   const [detailsView, setDetailsView ] = useState(false)
   const [formData, setFormData] = useState({})
   const [showModal, setShowModal] = useState(false)
   const [showEditModal, setShowEditModal] = useState(false)
   const [showNewEmployeeModal,setShowNewEmployeeModal ] = useState(false)
   const [message, setMessage] = useState('')
   const [feedbackAlert, setFeedbackAlert] = useState(false)

  // const {data, error, loading} = useAxiosRequest('get', `${process.env.REACT_APP_DEV_URI}/admin/${selectedEmployee.id}`)
  // const getUserInfo = async() => {
  //   const options ={
  //     method:'get',
  //     url: `http://localhost:3001/api/v2/users-by-email/${user.email}`,
  //     headers:{
  //       Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdReExoSGhuY0hQZ2VOWHZXT0dIbyJ9.eyJpc3MiOiJodHRwczovL2Rldi1ycWJ2bXVid2M2eGVvZ2RuLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJHZEFEQmgyODAwT01tcUt3b1FFcmdpT1RqNU5MSmJqakBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtcnFidm11YndjNnhlb2dkbi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3OTI0MTc5OSwiZXhwIjoxNjgxODMzNzk5LCJhenAiOiJHZEFEQmgyODAwT01tcUt3b1FFcmdpT1RqNU5MSmJqaiIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.Y90vL0SkTi_brz9ZNgR6XlafZxzGKMHrFCFyLdQtxro35JLdpqnzbY2JcxBbnIpfSTPLWv5RPcG-5ea_Hre56BPVJLSzHJFxsvrk7FbYj7fjR8WNjZG-eLsarQVhvZJ8jIwGkZkhUI0s96lk53NjXpwVlGkihzAuCRsUMB1G1wlCnxN_KCLiMECPWZanDFn5rxTlc8Zw9snRhtUECusaY2X0NRqIdrkAXvig-L6AKcG8SHA4gAQItvTAxESYnnXGdLX2Rw9OOXEZzf2CtbtsBRqInRqMdYRzV59waSVCsQW4fKV0aznePzQko7x1RYBVmW3-Y_q62C24MqrGM8Mn8w`
  //     }
  //   }
  //   try{
  //     const response = await axios(options)
  //     console.log(response.data);
  //   }catch(error){
  //     console.log(error);
  //   }
  // }
  //
  // const getManagementToken = () => {
  //   let options = {
  //     method: 'POST',
  //     url: 'https://dev-rqbvmubwc6xeogdn.us.auth0.com/oauth/token',
  //     headers: {'content-type': 'application/x-www-form-urlencoded'},
  //     data: new URLSearchParams({
  //       grant_type: 'client_credentials',
  //       client_id: 'X0GQSDYSxhmrz10eWiwjmRpP6epdS6BY',
  //       client_secret: 'NBaHWMjrKANrftsosHtEHqlrjWVv7knIPGGfBQsu5YVb04c85xfDBPElqyMdErzj',
  //       audience: 'https://dev-rqbvmubwc6xeogdn.us.auth0.com/api/v2/'
  //     })
  //   }
  //
  //   axios.request(options)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error)=>{
  //       console.error(error);
  //     })
  // }
  //
  // getManagementToken()

   useEffect(() => {
     setFeedbackAlert(true)
   },[message])

   return (
      <>
         <div className="header">
          {user && <h4 className="user-name">Hello, {user.name}</h4>}
          <AddEmployeeButton
             selectedEmployee={selectedEmployee}
             showNewEmployeeModal={showNewEmployeeModal}
             setShowNewEmployeeModal={setShowNewEmployeeModal}/>
           <Login />
           <Logout />
         </div>
         {isLoading?<h3 className="loading-text">Loading...</h3>:
            <>
              <div className="main">
                {isAuthenticated && (
                  <>
                    <div className="dashboard">
                       <Profile
                         selectedEmployee={selectedEmployee}
                         fetchSchedule={fetchSchedule}
                         schedule={schedule}
                         setSchedule={setSchedule}
                         editMode={editMode}
                         setEditMode={setEditMode}
                         detailsView={detailsView}
                         setDetailsView={setDetailsView}
                         eventForm={eventForm}
                         setEventForm={setEventForm}
                         formData={formData}
                         setFormData={setFormData}
                         setShowEditModal={setShowEditModal}
                         setMessage={setMessage}/>
                       {showModal?
                          <Modal>
                            <EventForm
                               selectedEmployee={selectedEmployee}
                               eventForm={eventForm}
                               setEventForm={setEventForm}
                               fetchSchedule={fetchSchedule}
                               setShowModal={setShowModal}
                               setMessage={setMessage}/>
                          </Modal>
                       :null}
                       {showEditModal?
                         <Modal>
                            <EmployeeEditForm
                               setShowEditModal={setShowEditModal}
                               selectedEmployee={selectedEmployee}
                               setSelectedEmployee={setSelectedEmployee}/>
                         </Modal>
                       :null}
                       {showNewEmployeeModal?
                         <Modal>
                           <NewEmployeeForm
                              setShowNewEmployeeModal={setShowNewEmployeeModal}
                              selectedEmployee={selectedEmployee}
                              setSelectedEmployee={setSelectedEmployee}/>
                         </Modal>
                       :null}
                    </div>
                    <div className="main-top">
                       <div className="sideMenu">
                          <EmployeeList
                             employeeList={employeeList}
                             setEmployeeList={setEmployeeList}
                             setSelectedEmployee={setSelectedEmployee}
                             selectedEmployee={selectedEmployee}
                             setMessage={setMessage}/>
                       </div>
                       <div className="quick-menu">
                          {selectedEmployee?
                             <QuickMenu
                                selectedEmployee={selectedEmployee}
                                schedule={schedule}
                                fetchSchedule={fetchSchedule}
                                formData={formData}
                                eventForm={eventForm}
                                setEventForm={setEventForm}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                message={message}
                                setMessage={setMessage}
                                detailsView={detailsView}
                                setDetailsView={setDetailsView}/>
                             :
                             <p>Select an employee to to clock in and out.</p>
                          }
                       </div>
                    </div>
                  </>
                )}
                {feedbackAlert &&
                  <Snackbar open={feedbackAlert} autoHideDuration={6000} onClose={() => setFeedbackAlert(false)}>
                    <Alert onClose={() => setFeedbackAlert(false)} severity="success" sx={{ width: '100%', color:'#7cff40'}}>
                      {message}
                    </Alert>
                  </Snackbar>
                }
              </div>
            </>
          }
      </>
   )
}

export default App;
