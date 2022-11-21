import axios from 'axios'
import {useState, useEffect} from 'react'

const QuickMenu = (props) => {
   const [message, setMessage] = useState('')
   const quickAddEvent = (e) => {
      let body={}
      let targetKey = e.target.attributes.innerText.value
      body = {
         [targetKey]:e.target.id
      }
      console.log(body);
      axios
         .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/new-shift`, body)
         .then((response) => {
            props.fetchSchedule()
            setMessage(`${e.target.id} has been added.`)
         })
         .catch((error) => {console.log(error)})
   }

   return(
      props.selectedEmployee &&(<>
         <h4>{props.selectedEmployee.name}</h4>
         <div className="quickMenu">
            <div>
               <button id="clockIn" innerText="start" onClick={quickAddEvent}>
                  Clock-In
               </button>
            </div>
            <div>
               <button id="clockOut" innerText="end" onClick={quickAddEvent}>
                  Clock-Out
               </button>
            </div>
            <div>
               <button id="Lunch" innerText="period" onClick={quickAddEvent}>
                  Add Lunch
               </button>
            </div>
            <div>
               <button id="Dinner" innerText="period" onClick={quickAddEvent}>
                  Add Dinner
               </button>
            </div>
            <div>
               <button id="Double" innerText="period" onClick={quickAddEvent}>
                  Add Double
               </button>
            </div>
         </div>
         <div className="quickMessage">
            {message}
         </div>
      </>)
   )
}

export default QuickMenu
