import axios from 'axios'
import {useState, useEffect} from 'react'

const QuickMenu = (props) => {
   const [message, setMessage] = useState('')
   const [currentDateTime, setCurrentDateTime] = useState([])
   const [clockOutDisabled, setClockOutDisabled]= useState(false)
   const [clockInDisabled, setClockInDisabled]= useState(false)
   const LocalStorage = window.localStorage

   const writeToDb = (e) => {
      let body={}
      let targetKey = e.target.attributes.innerText.value
      body = {
         date:currentDateTime[0],
         [targetKey]:e.target.id
      }
      axios
         .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/new-shift`, body)
         .then((response) => {
            props.fetchSchedule()
         })
         .catch((error) => {console.log(error)})
   }

   const quickAddEvent = async (e) => {
      const dateAndTime = await getCurrentDateAndTime()
      writeToDb(e)
   }

   const clockIn = async(e) => {
      try{
         if(!LocalStorage.getItem(props.selectedEmployee._id)){
            const dateAndTime = await getCurrentDateAndTime()
            const token = {
               employeeName:props.selectedEmployee.name,
            }
            LocalStorage.setItem(props.selectedEmployee._id, JSON.stringify(token))
            setMessage(`${props.selectedEmployee.name} has been clocked in.`)
            writeToDb(e)
         }

      }catch(error){console.log(error);}
   }

   const clockOut = async() => {
      //Get shift Id of shift we need to edit
      try{
         if (LocalStorage.getItem(props.selectedEmployee._id)){
            const res = await axios
               .get(`http://localhost:3001/schedule/${props.selectedEmployee._id}/clockout`)
               await getCurrentDateAndTime()
               let body = {
                  id:res.data.id,
                  date:res.data.date,
                  start:res.data.start,
                  end:currentDateTime[1],
                  period:res.data.period
               }
               await axios
                  .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/edit/${body.id}`, body)
               props.fetchSchedule()
               setMessage(`${props.selectedEmployee.name} has been clocked out.`)
               LocalStorage.removeItem(props.selectedEmployee._id)
         }
      }catch(error){console.log(error)}
   }

   const getCurrentDateAndTime = () => {
      let currentDate = new Date().toLocaleDateString()
      let currentTime = new Date().toLocaleTimeString()
      setCurrentDateTime([currentDate, currentTime])
   }

   const checkLocalStorage = () => {
      if(LocalStorage.getItem(props.selectedEmployee._id)){
         setClockInDisabled(true)
         setClockOutDisabled(false)
      }else{
         setClockInDisabled(false)
         setClockOutDisabled(true)
      }
   }

   useEffect(() => {
      getCurrentDateAndTime()
      checkLocalStorage()
   },[props.selectedEmployee, message])

   return(
      props.selectedEmployee &&(<>
         <h4>{props.selectedEmployee.name}</h4>
         <div className="quickMessage">
            {message}
         </div>
         <div className="quickMenu">
            <div>
               <button id={currentDateTime[1]} innerText="start" onClick={clockIn} disabled={clockInDisabled}>
                  Clock-In
               </button>
            </div>
            <div>
               <button id="clockOut" innerText="end" onClick={clockOut} disabled={clockOutDisabled}>
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
      </>)
   )
}

export default QuickMenu
