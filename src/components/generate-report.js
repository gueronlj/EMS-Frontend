import React, {useState} from 'react'
import ReportFilters from './report-filters.js'

const GenerateReport = (props) => {
   const [totalDays, setTotalDays] = useState(0)
   const [totalHours, setTotalHours] = useState(0)
   const [totalWages, setTotalWages] = useState(0)

   return(
      <div className = "report-container">
         <div className="report">
            <h4>Labor Report</h4>
            <li>Total Days: {totalDays}</li>
            <li>Total Hours: {totalHours}</li>
            <li>Total Wages: {totalWages}</li>
         </div>
         <div className="report-filters">
            <ReportFilters
               setSchedule={props.setSchedule}
               selectedEmployee={props.selectedEmployee}
               setTotalDays={setTotalDays}
               setTotalHours={setTotalHours}
               setTotalWages={setTotalWages}/>
         </div>
      </div>
   )
}

export default GenerateReport
