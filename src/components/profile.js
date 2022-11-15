import {useState, useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Calendar from './calendar.js'

const Profile = () => {
   const { user, isAuthenticated, isLoading} = useAuth0();
   const [employeeList, setEmployeeList] = useState([])

   const updateEmployeeList = async() => {
      try{
         const response = await fetch("http://localhost:3001/admin");
         const data = await response.json();
         setEmployeeList(data);
      } catch(error){
         console.log(error);
      }
   }

   useEffect(() => {
      updateEmployeeList()
   },[])

   if (isLoading) return <p>Loading...</p>

   return (
      isAuthenticated && (
         <div>
            <h2>Hello, {user.name}!</h2>
            <table>
               <thead>
                  <tr>
                     <th>Employee Name</th>
                     <th>Phone</th>
                     <th>Hourly $</th>
                     <th>Daily $</th>
                  </tr>
               </thead>
               <tbody>
                  {employeeList.map((employee) => {
                     return(
                        <tr key={employee._id}>
                           <td>{employee.name}</td>
                           <td>{employee.phone}</td>
                           <td>{employee.perHour}</td>
                           <td>{employee.perDiem}</td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
            <Calendar/>
         </div>
      )
   )
}

export default Profile
