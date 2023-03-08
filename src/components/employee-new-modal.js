import NewEmployeeForm from './employee-new-form.js'

const NewEmployeeModal = (props) => {
  return(
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-header">
          <h2>New Employee</h2>
        </div>
        <div className="modal-content">
           <NewEmployeeForm
              setShowNewEmployeeModal={props.setShowNewEmployeeModal}
              selectedEmployee={props.selectedEmployee}
              setSelectedEmployee={props.setSelectedEmployee}/>
        </div>
      </div>
    </div>
  )
}

export default NewEmployeeModal
