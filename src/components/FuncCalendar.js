import React , {useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
// import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios'

const NewCalendar = (props)=> {

   const [currentEvents, setCurrentEvents] = useState([])

   const calendarRef = React.createRef()

   const handleDateSelect = (selectInfo) => {
      //TODO: Function-> user selects employee
      let calendarApi = selectInfo.view.calendar
      let payload = {
         id: 'fake id here',//TODO: make this dynmaic
         title: 'Employee name here', //TODO: make user choose Title
         start: selectInfo.startStr,
         end: selectInfo.endStr,
      }
      calendarApi.addEvent(payload)
      console.log(selectInfo);
      handleEventAdd(selectInfo)
   }

   //-----------------Remove event from calendar on click
   const handleEventClick = (clickInfo) => {
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
         clickInfo.event.remove()
         handleEventRemove(clickInfo)
      }
   }

   //-----------------Populate Calendar from database (1 employee)
   const fetchEvents = () => {
         //call API, search by employee ID
         axios
            .get(`http://localhost:3001/admin/${props.currentEmployee}`)
            .then((response) => {
               let events = response.data.schedule
               populateCalendar(events)
            })
            .catch((error) => {console.log(error)})
   }

   const populateCalendar=(array) => {
      let calendarApi = calendarRef.current._calendarApi.view.calendar
      array.forEach(item => {
         calendarApi.addEvent(item)
      });
   }

   const handleEvents = (events) => {
      setCurrentEvents(events)
   }

   const renderEventContent = (eventInfo) => {
     return (
       <>
         <b>{eventInfo.timeText}</b>
         <i>{eventInfo.event.title}</i>
       </>
     )
   }
//===============Databse Helpers=============
   //---------Remove event
   const handleEventRemove = (e) => {
      console.log('attempting to remove from db');
      let body = {
         start: e.startStr
      }
      axios
         .put(`http://localhost:3001/schedule/${props.currentEmployee}/remove`, body)
         .then((response) => {
            console.log('removal success!!');
         })
         .catch((error) => {
            console.log(error);
         })
   }
   //---------Add event
   const handleEventAdd = (e) => {
      //create shift object to send to database
      console.log('trying to add to db');
      let body = {
         //TODO!MAKE DATE DYNAMIC
         date:0,
         start:e.startStr,
         end:e.endStr,
         //TODO! make period dynamic!
         period: 'lunch'
      }
      axios //TODO! Make player ID dynamic!
      .put(`http://localhost:3001/schedule/${props.currentEmployee}/new-shift`,body)
      .then((response, error) => {
         console.log('event added to DB!');
      })
   }

   return(
      <div className="App">
         <FullCalendar
            ref={calendarRef}
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ]}
            initialView='timeGridWeek'
            headerToolbar={{
               right: 'prev,next today',
               center: 'title',
               left: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            editable={true}
            selectable={true}
            select={handleDateSelect}
            selectMirror={true}
            eventClick={handleEventClick}
            // eventAdd={handleEventAdd}
            eventContent={renderEventContent}
            eventsSet={handleEvents}
            // initialEvents={state.currentEvents}
          />
      </div>
   )
}

export default NewCalendar
