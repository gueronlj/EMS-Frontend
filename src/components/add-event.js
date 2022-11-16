import React, {useState, useEffect} from 'react'

const AddEvent = (props) => {
   const [text, setText] = useState("Add event")
   const [disabled, setDisabled] = useState(true)

   const handleClick =() => {
      if(props.eventForm){
         props.setEventForm(false);
         setText('Add event')
      } else{
         props.setEventForm(true);
         setText('Cancel')
      }
   }

   const checkButton = () => {
      props.selectedEmployee && setDisabled(false)
   }

   useEffect(() => {
      console.log('checking button');
      checkButton();
   },[props.selectedEmployee])

   return(
         <button onClick={()=>{handleClick()}} disabled={disabled}>
            {text}
         </button>
   )
}
export default AddEvent
