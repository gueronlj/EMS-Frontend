import {useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

const EmployeeList = (props) => {

   const {isLoading} = useAuth0();
   const TARGET_URI = 'http://localhost:3001';
   const updateEmployeeList = async() => {
      try{
         const response = await axios.get(`${TARGET_URI}/admin`);
         props.setEmployeeList(response.data);
      }catch(error){console.log(error)}
   }

   const handleNameClick =(e) => {
      props.setSelectedEmployee(e)
   }

   useEffect(() => {
      updateEmployeeList()
   },[])

   if (isLoading) return <p>Loading employee info...</p>
   return (
      <>
         <h3>Employees</h3>
         {props.employeeList.map( employee => {
            return(
               <li key={employee._id} className="employee-name" onClick={() => {
                  handleNameClick(employee);
               }} >{employee.name}</li>
            )
         })}
      </>
   )
}

export default EmployeeList
