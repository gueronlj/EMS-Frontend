import EmployeeEditForm from './employee-edit-form.js'

const EmployeeEditModal = (props) => {
  return(
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-header">
          <h2>Editing {props.selectedEmployee.name}</h2>
        </div>
        <div className="modal-content">
           <EmployeeEditForm
              setShowEditModal={props.setShowEditModal}
              selectedEmployee={props.selectedEmployee}
              setSelectedEmployee={props.setSelectedEmployee}/>
        </div>
      </div>
    </div>
  )
}

export default EmployeeEditModal
