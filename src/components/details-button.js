import React, {useState, useEffect} from 'react'

const DetailsButton = (props) => {
   const [disabled, setDisabled] = useState(true)
   const [detailButtonText, setDetailButtonText] = useState("View details")

   const checkButton = () => {
      if(props.selectedEmployee){
         setDisabled(false)
      }else{
         setDisabled(true)
      }
   }

   const toggleDetailsView = () => {
      if(props.detailsView){
         props.setDetailsView(false)
         setDetailButtonText('Show details')
      }else{
         props.setDetailsView(true)
         setDetailButtonText('Hide details')
      }
   }

   useEffect(() => {
      checkButton();
   },[props.selectedEmployee])

   return(
         <button id="details-btn" onClick={()=>{toggleDetailsView()}} disabled={disabled}>
            {detailButtonText}
         </button>
   )
}
export default DetailsButton
