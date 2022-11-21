import {useState, useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const EmployeeList = (props) => {

   const { user, isAuthenticated, isLoading} = useAuth0();

   const updateEmployeeList = async() => {
      try{
         const response = await fetch("http://localhost:3001/admin");
         const data = await response.json();
         props.setEmployeeList(data);
      }catch(error){
         console.log(error);
      }
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
               <li key={employee._id} onClick={() => {
                  handleNameClick(employee);
               }} >{employee.name}</li>
            )
         })}
      </>
   )
}

export default EmployeeList
