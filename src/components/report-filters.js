import React, {useState} from 'react'
import { differenceInHours, parseISO } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Stack from '@mui/material/Stack';
const handleSubmit = () => {

}

const ReportFilters = () => {
   const [value, setValue] = useState()
   return(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <MobileDatePicker
          label="Starting Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
         />
         <MobileDatePicker
          label="End Date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
         />
      </LocalizationProvider>
   )
}
export default ReportFilters
