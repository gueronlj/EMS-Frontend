import React, {useState, useEffect} from 'react'

const GenerateReport = (props) => {

   return(
      <div className = "report-container">
         <div className="report">
            <li>Days: {props.totalDays}</li>
            <li>Hours: {props.totalHours}</li>
            <li>Total Wages: ${props.totalWages}</li>
         </div>
      </div>
   )
}
export default GenerateReport
