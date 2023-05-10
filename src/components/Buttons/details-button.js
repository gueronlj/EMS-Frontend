const DetailsButton = (props) => {
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
      Time sheet
    </button>
  )
}
export default DetailsButton
