import React, {useState, useEffect} from 'react'

const AddEmployeeButton = (props) => {
   const [disabled, setDisabled] = useState(true)
   const [buttonText, setButtonText] = useState("Add New Employee")

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
         <button id="details-btn" onClick={()=>{toggleButton()}} disabled={disabled}>
            {buttonText}
         </button>
   )
}
export default AddEmployeeButton
