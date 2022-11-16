import axios from 'axios'
import {useState, useEffect} from 'react'

const Schedule = (props) => {

   const [schedule, setSchedule] = useState()

   const fetchSchedule = () => {
      axios
         .get(`http://localhost:3001/admin/${props.selectedEmployee}`)
         .then((response) => {
            setSchedule(response.data.schedule)
         })
         .catch((error) => {console.log(error)})
   }

   useEffect(() => {
      fetchSchedule()
   },[schedule])

   return(
      schedule && (
            <table>
            {schedule.length ?
               <thead>
                  <tr>
                     <th>Start</th>
                     <th>End</th>
                     <th>L/D</th>
                  </tr>
               </thead>:
               <p>No schedule found</p>
            }
               <tbody>
                  {schedule.map((shift) => {
                     return(
                        <tr>
                           <td>{shift.start}</td>
                           <td>{shift.end}</td>
                           <td>{shift.period}</td>
                        </tr>
                     )})}
               </tbody>
            </table>
      )
   )
}

export default Schedule
