import {useState, useEffect} from 'react'
import axios from 'axios'
import { formatRelative, parseJSON } from 'date-fns'

const Notes = () => {
    
    const [ notes, setNotes ] = useState([]);
    const [ message, setMessage ] = useState('')
    const API = 'https://hangrypanda-backend.herokuapp.com'
    const todaysDate = new Date();

    const fetchNotes=()=>{
        axios.get(`${API}/notes`)
           .then((res, error)=>{
              if(error){
                 res.json(error);
                 console.log(error);
              }else{
                 setNotes(res.data)
              }
           })
     }

     const handleInput = (e) => {
        setMessage(e.target.value)
     }

     const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`${API}/notes/new`,{message:message})
            .then((res,error)=>{
                if(error){
                    res.json(error);
                    console.log(error);
                }else{
                    fetchNotes()
                }
            })
     }

     const deleteNote = (note) => {
        axios.delete(`${API}/notes/${note._id}`)
         .then((res,error)=>{
            if(error){
               res.json(error);
               console.log(error);
            }else{
               fetchNotes()
            }
         })
     }
     
     useEffect(() => {
        fetchNotes()
     },[])

    return(
        <div>
            {notes.map((note)=> {
            return(
               <div key={note._id} className='note'>
                  <div className='note-top'>
                     <p className="time-stamp">{formatRelative(parseJSON(note.createdAt), todaysDate)}</p>
                     <img src="./images/xthin.png" onClick={()=>deleteNote(note)} alt=""/>
                  </div>
                  <div className='note-bottom'>
                    {note.message}
                  </div>
               </div>
            )
         })}
         <form className='sendMsg' onSubmit={handleSubmit}>
             <textarea onChange={handleInput} /><br/>
             <input id = "note-submit" type='submit' value='Submit'/>
         </form>
        </div>
    )
}

export default Notes;