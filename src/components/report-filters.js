import React, {useState} from 'react'
import axios from 'axios'
import { differenceInHours, parseISO } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Stack from '@mui/material/Stack';

const ReportFilters = (props) => {
   const [startLimit, setStartLimit] = useState(new Date('1,1,2023'))
   const [endLimit, setEndLimit] = useState(new Date())

   const handleSubmit = async () => {
      let startISO = startLimit.toISOString()
      let endISO = endLimit.toISOString()
      console.log(startISO, endISO);
      try{
         const res = await axios
            .get(`http://localhost:3001/report/${props.selectedEmployee._id}/${startISO}/${endISO}`)
         console.log(res.data);
         props.setSchedule(res.data)
         props.setTotalDays(res.data.length)
         const sumHours = calculateTotalHours(res.data)
         const sumWages = calculateTotalWages(sumHours)
         props.setTotalHours(sumHours)
         props.setTotalWages(sumWages)
      }catch(error){console.log(error)}
   }

   const createReport = () => {
      props.setTotalWages(calculateTotalWages(props.totalHours))
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
         total = props.selectedEmployee.perDiem * props.totalDays
      }
      if(props.selectedEmployee.perHour){
         total = hours * props.selectedEmployee.perHour;
      }
      return(total);
   }

   return(
     <Stack spacing={2}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <MobileDatePicker
          label="Starting Date"
          value={startLimit}
          onChange={(newValue) => {setStartLimit(newValue)}}
          renderInput={(params) => <TextField {...params} />}/>
         <MobileDatePicker
          label="End Date"
          value={endLimit}
          onChange={(newValue) => {setEndLimit(newValue)}}
          renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
      <button onClick={handleSubmit}>Apply</button>
   </Stack>)
}
export default ReportFilters
