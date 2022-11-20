import React, {useState, useEffect} from 'react'
import axios from 'axios'

const EditEvent = (props) => {
   const handleInput=(e) => {
      props.setFormData({...props.formData, [e.target.name]:e.target.value})
   }
   const handleSubmit=(e) => {
      e.preventDefault()
      const body ={
         date:props.formData.date,
         period:props.formData.period,
         start:props.formData.start,
         end:props.formData.end,
      }
      axios
         .put(`http://localhost:3001/schedule/${props.selectedEmployee._id}/edit/${props.editTarget.id}`, body)
         .then((response) => {
            console.log(response.data)
            props.fetchSchedule()
         })
         .catch((error) => {console.log(error)})
   }

   const renderEditForm = () => {
      if (props.editTarget.name ==='date'){
         console.log('tring to render date edit');//render input type "date"}
         return (<form onSubmit={handleSubmit}>
            <input onChange={handleInput} type='date' name={props.editTarget.name} value={props.formData.date}/>
            <button type="submit">
              Submit
            </button>
         </form>)
      }
      else if (props.editTarget.name ==='start'||props.editTarget.name ==='end'){
         console.log('tring to render time edit')//render input type "time"
         return (<form onSubmit={handleSubmit}>
            <input onChange={handleInput} type='time' name={props.editTarget.name} value={props.formData.start||props.formData.end}/>
            <button type="submit">
              Submit
            </button>
         </form>)
      }
      else if (props.editTarget.name ==='period'){
         console.log('tring to render period edit')//render input type "select"
         return(
            <form onSubmit={handleSubmit}>
               <select onChange={handleInput} name={props.editTarget.name} value={props.formData.period}>
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

   return(
      props.editMode && renderEditForm()
   )
}
export default EditEvent
