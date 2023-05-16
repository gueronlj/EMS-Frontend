import EditProfileBtn from '@components/Buttons/edit-profile-button.js'

const Details = (props) => {
  return(
    props.selectedEmployee &&
      <div className="employeeDetails">
        <div className="details">
          <li>Phone: {props.selectedEmployee.phone||"NA"}</li>
          <li>Hourly Rate: ${props.selectedEmployee.perHour||"NA"}</li>
          <li>Daily Rate: ${props.selectedEmployee.perDiem||"NA"}</li>
        </div>
        <div className = 'buttons'>
           <EditProfileBtn
              selectedEmployee={props.selectedEmployee}
              setShowEditModal={props.setShowEditModal}/>
           <button
              className="cancel-btn"
              onClick={()=>props.setDetailsView(false)}>
              Close
           </button>
        </div>
      </div>
  )
}
export default  Details
