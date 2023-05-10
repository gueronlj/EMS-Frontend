import React, {useState} from 'react'
import axios from 'axios'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useAuth0 } from '@auth0/auth0-react';

const ReportFilters = (props) => {
  const { getAccessTokenSilently } = useAuth0()
  const URL = process.env.REACT_APP_DEV_URI;
  const [startLimit, setStartLimit] = useState(new Date('1,1,2023'))
  const [endLimit, setEndLimit] = useState(new Date())

  const handleSubmit = async () => {
    let startISO = startLimit.toISOString()
    let endISO = endLimit.toISOString()
    try{
      const token = await getAccessTokenSilently()
      const options = {
        method: 'get',
        url: `${URL}/report/${props.selectedEmployee._id}/${startISO}/${endISO}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(options)
      props.setSchedule(response.data.schedule)
      props.setTotalDays(response.data.totalDays)
      props.setTotalHours(response.data.totalHours)
      props.setTotalDailyWages(response.data.totalDailyWages)
      props.setTotalHourlyWages(response.data.totalHourlyWages)
    }catch(error){console.error(error.message)}
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
