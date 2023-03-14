import {useEffect, useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

const EmployeeList = (props) => {
   const {isLoading} = useAuth0();
   const TARGET_URI = process.env.REACT_APP_DEV_URI;
   const [loading, setLoading] = useState(true)

   const updateEmployeeList = async() => {
      setLoading(true)
      try{
         const response = await axios.get(`${TARGET_URI}/admin`);
         props.setEmployeeList(response.data);
         setLoading(false)
      }catch(error){console.log(error)}
   }

   const handleNameClick =(e) => {
      props.setSelectedEmployee(e)
      props.setMessage('')
   }

   useEffect(() => {
      updateEmployeeList()
   },[])

   if (loading) return <p>Loading employee info...</p>
   return (
      <>
         {props.employeeList.map( employee => {
            return(
               <li
                  key={employee._id}
                  className="employee-name"
                  onClick={()=>{handleNameClick(employee)}}>
                     {employee.name}
               </li>
            )
         })}
      </>
   )
}
export default EmployeeList
