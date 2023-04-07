import {useEffect, useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import {useAxiosRequest} from './hooks/useAxiosRequest.js'

const EmployeeList = (props) => {
  const TARGET_URI = process.env.REACT_APP_DEV_URI;
  const {data, error, loading} = useAxiosRequest('get', `${TARGET_URI}/admin`)

  const handleNameClick =(e) => {
    props.setSelectedEmployee(e)
    props.setMessage('')
  }

  if (loading) return <p>Loading employee info...</p>
  return (
    <>
      {data.map( employee => {
        return(
          <li
            key={employee._id}
            className="employee-name"
            onClick={()=>{handleNameClick(employee)}}>
              {employee.name}
          </li>
        )
      })}
    </>
  )
}
export default EmployeeList
