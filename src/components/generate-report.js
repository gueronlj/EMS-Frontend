import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { differenceInHours, parseISO } from 'date-fns'
import ReportFilters from './report-filters.js'

const GenerateReport = (props) => {
   const [calculated, setCalculated] = useState({})
   const [totalDays, setTotalDays] = useState(0)
   const [totalHours, setTotalHours] = useState(0)
   const [totalWages, setTotalWages] = useState(0)

   const fetchData = async() => {
      try{
         const response = await axios
            .get(`http://localhost:3001/admin/${props.selectedEmployee._id}`)
         console.log(response.data);
         setTotalDays(response.data.schedule.length)
         const sumHours = calculateTotalHours(response.data.schedule)
         const sumWages = calculateTotalWages(sumHours)
         setTotalHours(sumHours)
         setTotalWages(sumWages)
      }catch(error){console.log(error)}
   }

   const createReport = () => {
      setTotalWages(calculateTotalWages(totalHours))
   }

   const calculateTotalHours = (schedule) => {
      //TODO: Currently only counts full hours, ie- 59 min = 0 hours
      let sum = 0
      schedule.length &&
         schedule.forEach((shift) => {
            if(shift.start && shift.end){
               let startTime = parseISO(shift.start)
               let endTime = parseISO(shift.end)
               let hoursInShift = differenceInHours(endTime, startTime)
               sum += hoursInShift
            }
         })
      return(sum);
   }

   const calculateTotalWages = (hours) => {
      let total = 0
      if(props.selectedEmployee.perDiem){
         total = props.selectedEmployee.perDiem * totalDays
      }
      if(props.selectedEmployee.perHour){
         total = hours * props.selectedEmployee.perHour;
      }
      return(total);
   }

   useEffect(() => {
      fetchData()
   },[props.schedule])

   return(
      <div className = "report-container">
         <div className="report">
            <h4>Labor Report</h4>
            <li>Total Days: {totalDays}</li>
            <li>Total Hours: {totalHours}</li>
            <li>Total Wages: {totalWages}</li>
            <button onClick={createReport}>Refresh</button>
         </div>
         <div className="report-filters">
            <ReportFilters/>
         </div>
      </div>
   )
}

export default GenerateReport
