import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Schedule = (props) => {
   const schedule = props.schedule
   return(
      schedule && (
         <table>
            <thead>
               <tr>
                  <th>Start</th>
                  <th>End</th>
                  <th>L/D</th>
               </tr>
            </thead>
            <tbody>
               {schedule.map((shift) => {
                  return(
                     <tr key={shift.start}>
                        <td>{shift.start}</td>
                        <td>{shift.end}</td>
                        <td>{shift.period}</td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      )
   )
}

export default Schedule
