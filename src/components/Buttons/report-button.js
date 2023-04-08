import {useState, useEffect} from 'react'

const ReportButton = (props) => {
   const [disabled, setDisabled] = useState(true)
   const showReport = () => {
      props.setOpenReport(true)
   }
   useEffect(() => {
      if(props.selectedEmployee){setDisabled(false)}
   },[props.selectedEmployee])

   return(
      <button onClick={showReport} disabled={disabled}>View report</button>
   )
}

export default ReportButton
