import axios from 'axios'
import {useState, useEffect} from 'react'
import {parse} from 'date-fns'

const QuickMenu = (props) => {
   const [message, setMessage] = useState('')
   const [clockOutDisabled, setClockOutDisabled]= useState(false)
   const [clockInDisabled, setClockInDisabled]= useState(false)
   const LocalStorage = window.localStorage

   const writeToDb = (e) => {
      let body={}
      let targetKey = e.target.attributes.innerText.value
      body = {
         date:new Date().toLocaleDateString(),
         [targetKey]:e.target.id
      }
      let startISO = parse(body.start, 'pp', new Date())
      let endISO = parse(body.end, 'pp', new Date())
      if(body.start){body.start = startISO}
      if(body.end){body.end = endISO}
      console.log(body);
      axios
         .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/new-shift`, body)
         .then((response) => {
            props.fetchSchedule()
         })
         .catch((error) => {console.log(error)})
   }

   const quickAddEvent = async (e) => {
      writeToDb(e)
   }

   const clockIn = async(e) => {
      try{
         if(!LocalStorage.getItem(props.selectedEmployee._id)){
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
               let time = new Date().toLocaleTimeString()
               let endTimeISO = parse(time, 'pp' , new Date())
               let body = {
                  id:res.data.id,
                  date:res.data.date,
                  start:res.data.start,
                  end:endTimeISO,
                  period:res.data.period
               }
               console.log(body);
               await axios
                  .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/edit/${body.id}`, body)
                  .then(() => {
                     props.fetchSchedule()
                     setMessage(`${props.selectedEmployee.name} has been clocked out.`)
                     LocalStorage.removeItem(props.selectedEmployee._id)
                  })
                  .catch((error) => {console.log(error)})
         }
      }catch(error){console.log(error)}
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
               <button id={new Date().toLocaleTimeString()} innerText="start" onClick={clockIn} disabled={clockInDisabled}>
                  Clock-In
               </button>
            </div>
            <div>
               <button id={new Date().toLocaleTimeString()} innerText="end" onClick={clockOut} disabled={clockOutDisabled}>
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
