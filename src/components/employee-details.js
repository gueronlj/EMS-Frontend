import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Details = (props) => {

   const [details, setDetails] = useState()

   const fetchDetails = () => {
      axios
         .get(`http://localhost:3001/admin/${props.selectedEmployee._id}`)
         .then((response) => {
            setDetails(response.data)
         })
         .catch((error) => {console.log(error)})
   }

   useEffect(() => {
      fetchDetails()
   },[props.selectedEmployee])

   return(
      details &&(
         <div className="employeeDetails">
            <h3>Details</h3>
               <li>Name:{details.name}</li>
               <li>Contact:{details.phone}</li>
               <li>Hourly Rate:{details.perHour}</li>
               <li>Daily Rate:{details.perDiem}</li>
         </div>
      )
   )
}

export default  Details
