const AddEvent = (props) => {
   const handleClick =() => {
      props.eventForm?props.setEventForm(false):props.setEventForm(true)
   }

   return(
         <button onClick={() => {handleClick()} }>
            Add event
         </button>
   )
}
export default AddEvent
