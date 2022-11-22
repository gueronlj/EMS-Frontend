import axios from 'axios'
import {useState, useEffect} from 'react'

const QuickMenu = (props) => {
   const [message, setMessage] = useState('')
   const [currentDateTime, setCurrentDateTime] = useState([])
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
            setMessage(`${e.target.id} has been added.`)
         })
         .catch((error) => {console.log(error)})
   }

   const quickAddEvent = async (e) => {
      const dateAndTime = await getCurrentDateAndTime()
      //add token to localStorage
      // localStorage.setItem(storageKey, JSON.stringify(value));
      const token = {
         employeeId:props.selectedEmployee._id,
         employeeName:props.selectedEmployee.name,
         date:currentDateTime[0],
         time:currentDateTime[1]
      }
      LocalStorage.setItem(props.selectedEmployee._id, JSON.stringify(token))
      writeToDb(e)
   }

   const clockOut = async() => {
      //Get shift Id of shift we need to edit
      try{
         if (LocalStorage.getItem(props.selectedEmployee._id)){
            const res = await axios
               .get(`http://localhost:3001/schedule/${props.selectedEmployee._id}/clockout`)
               const dateAndTime = await getCurrentDateAndTime()
               console.log(res.data);
               let body = {
                  id:res.data.id,
                  date:res.data.date,
                  start:res.data.start,
                  end:currentDateTime[1],
                  period:res.data.period
               }
               let clockedOut = await axios
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

   useEffect(() => {
      getCurrentDateAndTime()
   },[])

   return(
      props.selectedEmployee &&(<>
         <h4>{props.selectedEmployee.name}</h4>
         <div className="quickMenu">
            <div>
               <button id={currentDateTime[1]} innerText="start" onClick={quickAddEvent}>
                  Clock-In
               </button>
            </div>
            <div>
               <button id="clockOut" innerText="end" onClick={clockOut}>
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
