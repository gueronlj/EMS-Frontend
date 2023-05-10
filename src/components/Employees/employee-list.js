const EmployeeList = (props) => {
  const handleNameClick =(e) => {
    props.setSelectedEmployee(e)
    props.setMessage('')
  }

  return (
    <>
      {props.loadingEmployees && <p>Loading spinne here..</p>}
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
