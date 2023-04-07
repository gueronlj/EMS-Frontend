import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useAxiosRequest} from './hooks/useAxiosRequest.js'

const Details = (props) => {
  const TARGET_URI = process.env.REACT_APP_DEV_URI;
  const {data, error, loading} = useAxiosRequest('get', `${process.env.REACT_APP_DEV_URI}/admin/${props.selectedEmployee._id}`)

  if (loading) return <p>Loading...</p>
  return(
    data &&
      <div className="employeeDetails">
        <li>Phone: {data.phone}</li>
        <li>Hourly Rate: ${data.perHour}</li>
        <li>Daily Rate: ${data.perDiem}</li>
      </div>
  )
}
export default  Details
