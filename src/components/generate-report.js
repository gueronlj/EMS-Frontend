import React, {useState, useEffect} from 'react'
import { differenceInHours, parseISO } from 'date-fns'

const GenerateReport = (props) => {
   const [totalHours, setTotalHours] = useState(null)
   const [totalWorkDays, setTotalWorkDays] = useState(null)
   const [totalWages, setTotalWages] = useState(null)
   const [data, setData] = useState({})

   const fetchData = () => {
      props.fetchSchedule()
      props.schedule &&
         console.log(data);
         calculateTotalDays()
         calculateTotalHours()
         calculateTotalWages()
   }

   const calculateTotalHours = () => {
      //TODO: Currently only counts full hours, ie- 59 min = 0 hours
      let sum = 0
      props.schedule &&
         props.schedule.forEach((shift) => {
            let startTime = parseISO(shift.start)
            let endTime = parseISO(shift.end)
            let hoursInShift = differenceInHours(endTime, startTime)
            console.log(hoursInShift);
            sum += hoursInShift
         })
      setTotalHours(sum);
   }

   const calculateTotalDays = () => {
      props.schedule && setTotalWorkDays(props.schedule.length)
   }

   const calculateTotalWages = () => {
      if (props.selectedEmployee){
         const total = totalHours * props.selectedEmployee.perHour;
         setTotalWages(total);
      }
   }

   useEffect(() => {
      fetchData()
   },[])

   return(
      <>
         <div className="report">
            <h4>Labor Report</h4>
            <li>Total Days: {totalWorkDays}</li>
            <li>Total Hours: {totalHours}</li>
            <li>Total Wages: {totalWages}</li>
            <button onClick={fetchData}>Calculate</button>
         </div>
      </>
   )
}

export default GenerateReport
