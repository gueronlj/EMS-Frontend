import React, {useState, useEffect} from 'react'

const DetailsButton = (props) => {
   const [disabled, setDisabled] = useState(true)

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
         <button onClick={()=>{props.toggleDetailsView()}} disabled={disabled}>
            {props.detailButtonText}
         </button>
   )
}
export default DetailsButton
