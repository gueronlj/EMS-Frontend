<<<<<<< HEAD
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
=======
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
>>>>>>> 6db1040 (trying to fix clockout function)
