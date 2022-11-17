import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Schedule = (props) => {

   const [schedule, setSchedule] = useState()
   const [editTarget, setEditTarget ] = useState()

   const reference = React.createRef()

   const fetchSchedule = () => {
      axios
         .get(`http://localhost:3001/admin/${props.selectedEmployee._id}`)
         .then((response) => {
            setSchedule(response.data.schedule)
         })
         .catch((error) => {console.log(error)})
   }

   const handleClick = (e) => {
      let name = e.target.attributes.name
      console.log(name);
      if (name=='period'){console.log('clicking');}
      if (name=='end'){setEditTarget({name:'end',type:'time',value:''})}
      if (name=='start'){setEditTarget({name:'start',type:'time',value:''})}
      if (name=='date'){setEditTarget({name:'date',type:'date',value:''})}
   }

   const handleInput=(e) => {

   }

   const handleSubmit=() => {

   }

   const renderEditForm = (target, type) => {
      console.log('tring to render');

      const select = (<form onSubmit={handleSubmit}>
         <select name={editTarget.name}>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Double</option>
         </select>
      </form>)

      const input = (<form onSubmit={handleSubmit}>
         <select name={editTarget.name}>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Double</option>
         </select>
      </form>)

      if(type=='period'){
         return(select)
      }else{
         return(input)}
   }

   const checkEdit = () => {
      editTarget && renderEditForm(editTarget.name,editTarget.type)
   }


   useEffect(() => {
      fetchSchedule()
      editTarget && renderEditForm(editTarget.name,editTarget.type)
   },[schedule, editTarget])

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
                        <tr>
                           <td onClick={handleClick} name="date">{shift.date}</td>
                           <td onClick={handleClick} name="start">{shift.start}</td>
                           <td onClick={handleClick} name="end">{shift.end}</td>
                           <td onClick={handleClick} name="period">{shift.period}</td>
                        </tr>
                     )})}
               </tbody>
            </table>

      </>
      )

   )
}

export default Schedule
