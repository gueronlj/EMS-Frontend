import {useEffect, useState} from 'react'

const EmployeeList = (props) => {
  const handleNameClick =(e) => {
    props.setSelectedEmployee(e)
    props.setMessage('')
  }

  return (
    <>
      {props.employeeList.map( employee => {
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
