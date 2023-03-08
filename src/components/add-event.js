import React, {useState, useEffect} from 'react'

const AddEvent = (props) => {
   const [disabled, setDisabled] = useState(true)
   const [addEventText, setAddEventText] = useState("Manual entry")

   const handleAddEvent =() => {
      props.setShowModal(true)
   }

   const checkButton = () => {
      if(props.selectedEmployee){
         setDisabled(false)
      }else{
         setDisabled(true)
      }
   }

   useEffect(() => {
      checkButton();
   },[props.selectedEmployee])

   return(
         <button onClick={()=>{handleAddEvent()}} disabled={disabled}>
            {addEventText}
         </button>
   )
}
export default AddEvent
