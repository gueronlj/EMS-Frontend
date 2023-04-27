import React, {useState} from 'react'

const Details = (props) => {
  return(
    props.selectedEmployee &&
      <div className="employeeDetails">
        <li>Phone: {props.selectedEmployee.phone}</li>
        <li>Hourly Rate: ${props.selectedEmployee.perHour}</li>
        <li>Daily Rate: ${props.selectedEmployee.perDiem}</li>
      </div>
  )
}
export default  Details
