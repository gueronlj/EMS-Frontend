import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Paper from '@mui/material/Paper';

const Details = (props) => {

   const [details, setDetails] = useState()
   const TARGET_URI = 'http://localhost:3001';
   const fetchDetails = () => {
      axios
         .get(`${TARGET_URI}/admin/${props.selectedEmployee._id}`)
         .then((response) => {
            setDetails(response.data)
            props.setSchedule(response.data.schedule)
         })
         .catch((error) => {console.log(error)})
   }

   useEffect(() => {
      fetchDetails()
   },[props.selectedEmployee])

   return(
      details &&
         <div className="employeeDetails">
               <li>Phone: {details.phone}</li>
               <li>Hourly Rate: ${details.perHour}</li>
               <li>Daily Rate: ${details.perDiem}</li>
         </div>
   )
}

export default  Details
