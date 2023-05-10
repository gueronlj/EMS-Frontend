const AddEmployeeButton = (props) => {
   const toggleButton = () => {
      if(props.showNewEmployeeModal){
         props.setShowNewEmployeeModal(false)
      }else{
         props.setShowNewEmployeeModal(true)
      }
   }

   return(
     <button id="new-employee-btn" className="header-btn" onClick={()=>{toggleButton()}}>
        Add Employee
     </button>
   )
}
export default AddEmployeeButton
