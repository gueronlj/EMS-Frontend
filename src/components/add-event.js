import React, {useState, useEffect} from 'react'

const AddEvent = (props) => {
   const [disabled, setDisabled] = useState(true)
   const [addEventText, setAddEventText] = useState("Manual entry")

   const handleAddEvent =() => {
      // if(props.eventForm){
      //    props.setEventForm(false);
      //    setAddEventText('Manual entry')
      // } else{
      //    props.setEventForm(true);
      //    setAddEventText('Cancel')
      // }
      props.setEventForm(true)
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
