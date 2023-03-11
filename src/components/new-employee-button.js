import React, {useState, useEffect} from 'react'

const AddEmployeeButton = (props) => {
   const [disabled, setDisabled] = useState(true)

   const checkButton = () => {
      if(props.selectedEmployee){
         setDisabled(false)
      }else{
         setDisabled(true)
      }
   }

   const toggleButton = () => {
      if(props.showNewEmployeeModal){
         props.setShowNewEmployeeModal(false)
      }else{
         props.setShowNewEmployeeModal(true)
      }
   }

   useEffect(() => {
      checkButton();
   },[props.selectedEmployee])

   return(
         <button id="new-employee-btn" className="header-btn" onClick={()=>{toggleButton()}} disabled={disabled}>
            Add Employee
         </button>
   )
}
export default AddEmployeeButton
