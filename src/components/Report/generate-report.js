const GenerateReport = (props) => {
   return(
      <div className = "report-container">
         <div className="report">
            <li>Days: {props.totalDays}</li>
            <li>Hours: {props.totalHours}</li>
            <li>Total Daily Wages: ${props.totalDailyWages}</li>
            <li>Total Hourly Wages: ${props.totalHourlyWages}</li>
         </div>
      </div>
   )
}
export default GenerateReport
