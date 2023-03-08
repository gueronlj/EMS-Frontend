<<<<<<< HEAD
import React, {useState, useEffect} from 'react'

const DetailsButton = (props) => {
   const [disabled, setDisabled] = useState(true)
   const [detailButtonText, setDetailButtonText] = useState("Show Details")

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
         setDetailButtonText('Show Details')
      }else{
         props.setDetailsView(true)
         setDetailButtonText('Hide Details')
      }
   }

   useEffect(() => {
      checkButton();
   },[props.selectedEmployee])

   return(
         <button id="details-btn" className="header-btn" onClick={()=>{toggleDetailsView()}} disabled={disabled}>
            {detailButtonText}
         </button>
   )
}
export default DetailsButton
=======
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
         <button onClick={()=>{toggleDetailsView()}} disabled={disabled}>
            {detailButtonText}
         </button>
   )
}
export default DetailsButton
>>>>>>> 6db1040 (trying to fix clockout function)
