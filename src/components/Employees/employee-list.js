import { ThreeDots } from  'react-loader-spinner'
import AddEmployeeButton from '@components/Buttons/new-employee-button.js'

const EmployeeList = (props) => {
  const handleNameClick =(e) => {
    props.setSelectedEmployee(e)
  }

  return (
    <>
      {props.loadingEmployees===true &&
        <ThreeDots
          height="200"
          width="60"
          radius="9"
          color="#494E6B"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}/>
      }
      <AddEmployeeButton
        showNewEmployeeModal={props.showNewEmployeeModal}
        setShowNewEmployeeModal={props.setShowNewEmployeeModal}/>
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
