import {useState, useEffect} from 'react'

const EmployeeList = () => {
   const [employeeList, setEmployeeList] = useState([])

   const updateEmployeeList = async() => {
      try{
         const response = await fetch("http://localhost:3001/admin");
         const data = await response.json();
         setEmployeeList(data);
      }catch(error){
         console.log(error);
      }
   }

   useEffect(() => {
      updateEmployeeList()
   },[])

   return (
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
   )
}

export default EmployeeList
