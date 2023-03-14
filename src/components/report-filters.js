import React, {useState} from 'react'
import axios from 'axios'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const ReportFilters = (props) => {
   const URI = process.env.REACT_APP_DEV_URI;
   const [startLimit, setStartLimit] = useState(new Date('1,1,2023'))
   const [endLimit, setEndLimit] = useState(new Date())

   const handleSubmit = async () => {
      let startISO = startLimit.toISOString()
      let endISO = endLimit.toISOString()
      console.log(`${URI}/report/${props.selectedEmployee._id}/${startISO}/${endISO}`);
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
     <div className='report-filters'>
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
      <button onClick={handleSubmit} className='apply-btn'>Apply</button>
   </div>
  )
}
export default ReportFilters
