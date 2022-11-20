import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Schedule = (props) => {

   const [schedule, setSchedule] = useState()
   const [editTarget, setEditTarget ] = useState({id:'', name:'', value:null})
   const [editMode, setEditMode] =useState(false)
   const [formData, setFormData] = useState({})

   const fetchSchedule = () => {
      axios
         .get(`http://localhost:3001/admin/${props.selectedEmployee._id}`)
         .then((response) => {
            setSchedule(response.data.schedule)
         })
         .catch((error) => {console.log(error)})
   }

   const toggleEdit = () => {
      editMode?setEditMode(false):setEditMode(true)
   }

   const handleClick = (e) => {
      toggleEdit()
      let shiftId = e.target.parentElement.id
      console.log(shiftId);
      let fieldValue = e.target.innerText
      let fieldName = e.target.id
      fetchShiftInfo()
      setEditTarget({id:shiftId, name:fieldName, value:fieldValue})
   }

   const fetchShiftInfo = () => {
      axios
         .get(`http://localhost:3001/schedule/${props.selectedEmployee._id}/${editTarget.id}`)
         .then((response) => {
            console.log(response.data);
            setFormData({date:response.data.date, start:response.data.start, end:response.data.end, period:response.data.period})
         })
         .catch((error) => {
            console.log(error);
         })
   }

   const renderEditForm = () => {
      if (editTarget.name ==='date'){
         console.log('tring to render date edit');//render input type "date"}
         return (<form onSubmit={handleSubmit}>
            <input onChange={handleInput} type='date' name={editTarget.name} value={formData.date}/>
            <button type="submit">
              Submit
            </button>
         </form>)
      }
      else if (editTarget.name ==='start'||editTarget.name ==='end'){
         console.log('tring to render time edit')//render input type "time"
         return (<form onSubmit={handleSubmit}>
            <input onChange={handleInput} type='time' name={editTarget.name} value={formData.start||formData.end}/>
            <button type="submit">
              Submit
            </button>
         </form>)
      }
      else if (editTarget.name ==='period'){
         console.log('tring to render period edit')//render input type "select"
         return(
            <form onSubmit={handleSubmit}>
               <select onChange={handleInput} name={editTarget.name} value={formData.period}>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Double</option>
               </select>
               <button type="submit">
                 Submit
               </button>
            </form>
         )
      }
   }


   const handleInput=(e) => {
      setFormData({...formData, [e.target.name]:e.target.value})
   }

   const handleSubmit=(e) => {
      e.preventDefault()
      const body ={
         date:formData.date,
         period:formData.period,
         start:formData.start,
         end:formData.end,
      }
      axios
         .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/edit/${editTarget.id}`, body)
         .then((response) => {
            console.log(response.data)
         })
         .catch((error) => {console.log(error)})
   }

   useEffect(() => {
      fetchSchedule()
   },[schedule])

   return(
      schedule && (
         <>
            <table>
            {schedule.length ?
               <thead>
                  <tr>
                     <th>Date</th>
                     <th>Start</th>
                     <th>End</th>
                     <th>L/D</th>
                  </tr>
               </thead>:
               <p>No schedule found</p>
            }
               <tbody>
                  {schedule.map((shift) => {
                     return(
                        <tr id={shift.id}>
                           <td onClick={handleClick} id="date">{shift.date}</td>
                           <td onClick={handleClick} id="start">{shift.start}</td>
                           <td onClick={handleClick} id="end">{shift.end}</td>
                           <td onClick={handleClick} id="period">{shift.period}</td>
                        </tr>
                     )})}
               </tbody>
            </table>
            {editMode && renderEditForm()}
         </>
      )
   )
}

export default Schedule
