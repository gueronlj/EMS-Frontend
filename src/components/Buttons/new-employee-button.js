const AddEmployeeButton = ({setShowNewEmployeeModal, showNewEmployeeModal}) => {
   const toggleButton = () => {
      if(showNewEmployeeModal){
         setShowNewEmployeeModal(false)
      }else{
         setShowNewEmployeeModal(true)
      }
   }

   return(
     <button id="new-employee-btn" className="header-btn" onClick={()=>{toggleButton()}}>
        Add Employee
     </button>
   )
}
export default AddEmployeeButton
