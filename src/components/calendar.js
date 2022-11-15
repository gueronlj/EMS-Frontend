
import React , {Component} from "react";
import {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
// import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios'

class NewCalendar extends Component {
   state = {
      currentEvents:[]
   }

   calendarRef = React.createRef()

   handleDateSelect = (selectInfo) => {
      //TODO: Function-> user selects employee
      console.log(selectInfo);
      let calendarApi = selectInfo.view.calendar
      calendarApi.addEvent({
         id: 'fake id here',//TODO: make this dynmaic
         title: 'Employee name here', //TODO: make user choose Title
         start: selectInfo.startStr,
         end: selectInfo.endStr,
      })
   }

   //-----------------Remove event from calendar on click
   handleEventClick = (clickInfo) => {
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
         clickInfo.event.remove()
      }
   }

   //-----------------Populate Calendar from database (1 employee)
   fetchEvents = () => {
      let events = []
      let calendarApi = this.calendarRef.current._calendarApi.view.calendar
         //call API, search by employee ID
         axios
            .get('http://localhost:3001/admin/'+'636e927ece43e8354b80a56a')
            .then((response) => {
               events = response.data.schedule
               events.forEach( shift => {
                  let payload = {
                     id:'placeholder ID',
                     title:'palceholder title',
                     start:shift.start,
                     end:shift.end
                  }
                  this.state.currentEvents.push(payload);
               })
            })
            .catch((error) => {
               console.log(error);
            })
            .finally(() => {
               let array = this.state.currentEvents
               array.forEach(item => {
                  calendarApi.addEvent(item)
               });
               console.log(calendarApi);
            })
   }

   //-----------------Update Database
   handleEventAdd = (e) => {
      //create shift object to send to database
      console.log(e.event.start);
      let body = {
         //TODO!MAKE DATE DYNAMIC
         date:0,
         start:e.event.start.toJSON(),
         end:e.event.end.toJSON(),
         //TODO! make period dynamic!
         period: 'lunch'
      }
      console.log(body);
      axios //TODO! Make player ID dynamic!
      .put('http://localhost:3001/schedule/'+'636e927ece43e8354b80a56a/new-shift',body)
      .then((response, error) => {
         console.log(response.data);
      })
   }

   componentDidMount() {
    this.fetchEvents()
   }
   componentDidUpdate() {
    this.fetchEvents()
   }

   render(){
      return(
         <div className="App">
            <FullCalendar
               ref={this.calendarRef}
               plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ]}
               initialView='timeGridWeek'
               headerToolbar={{
                  right: 'prev,next today',
                  center: 'title',
                  left: 'dayGridMonth,timeGridWeek,timeGridDay'
               }}
               // events={this.state.currentEvents}
               editable={true}
               selectable={true}
               select={this.handleDateSelect}
               selectMirror={true}
               eventClick={this.handleEventClick}
               eventAdd={this.handleEventAdd}
               eventChange={1}
               eventRemove={1}
               initialEvents={this.state.currentEvents}
             />
         </div>
      )
   }
}

export default NewCalendar
