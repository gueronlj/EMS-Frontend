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
   const URI = 'http://localhost:3001';
   const [startLimit, setStartLimit] = useState(new Date('1,1,2023'))
   const [endLimit, setEndLimit] = useState(new Date())

   const handleSubmit = async () => {
      let startISO = startLimit.toISOString()
      let endISO = endLimit.toISOString()
      try{
        const res = await axios
          .get(`${URI}/report/${props.selectedEmployee._id}/${startISO}/${endISO}`)
        console.log(res.data);
        props.setSchedule(res.data.schedule)
        props.setTotalDays(res.data.totalDays)
        props.setTotalHours(res.data.totalHours)
        props.setTotalDailyWages(res.data.totalDailyWages)
        props.setTotalHourlyWages(res.data.totalHourlyWages)
      }catch(error){console.log(error)}
    }

   return(
     <Stack spacing={2} direction="row">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <MobileDatePicker
          label="Starting Date"
          value={startLimit}
          onChange={(newValue) => {setStartLimit(newValue)}}
          renderInput={(params) => <TextField {...params}/>}
          />
         <MobileDatePicker
          label="End Date"
          value={endLimit}
          onChange={(newValue) => {setEndLimit(newValue)}}
          renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
      <button onClick={handleSubmit}>Apply</button>
   </Stack>
  )
}
export default ReportFilters
