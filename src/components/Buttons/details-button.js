import React, {useState, useEffect} from 'react'

const DetailsButton = (props) => {
   const [detailButtonText, setDetailButtonText] = useState("Time sheet")
   const toggleDetailsView = () => {
      if(props.detailsView){
         props.setDetailsView(false)
         // setDetailButtonText('Show Details')
      }else{
         props.setDetailsView(true)
         // setDetailButtonText('Hide Details')
      }
   }

   return(
         <button className="details-btn" onClick={()=>{toggleDetailsView()}}>
            {detailButtonText}
         </button>
   )
}
export default DetailsButton
