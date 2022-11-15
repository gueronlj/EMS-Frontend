
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

   handleDateSelect = (selectInfo) => {
      //TODO: Function-> user selects employee
         //adds shift to employee's schedule
      let calendarApi = selectInfo.view.calendar
      calendarApi.addEvent({
         id: 'fake id here',//TODO: make this dynmaic
         title: 'Employee name here', //TODO: make user choose Title
         start: selectInfo.startStr,
         end: selectInfo.endStr,
      })
   }

   //Remove event on click
   handleEventClick = (clickInfo) => {
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
         clickInfo.event.remove()
      }
   }

   //Update Database
   handleEventAdd = (e) => {
      //create shift object to send to database
      console.log(e.event.start);
      let body = {
         //!MAKE DATE DYNAMIC
         date:0,
         //!!!NOT WORKING BECAUSE THIS IS STRING, turn date into numbers??
         start:e.event.start.toJSON(),
         end:e.event.end.toJSON(),
         //TODO! make period dynamic!
         period: 'lunch'
         }
      console.log(body);
      axios //TODO! Make player ID dynamic!
      .put('http://localhost:3001/admin/'+'636e927ece43e8354b80a56a/new-shift',body)
      .then((response, error) => {
         console.log(response.data);
      })
   }

   render(){
      return(
         <div className="App">
            <FullCalendar
               plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ]}
               initialView='timeGridWeek'
               headerToolbar={{
                  right: 'prev,next today',
                  center: 'title',
                  left: 'dayGridMonth,timeGridWeek,timeGridDay'
               }}
               editable={true}
               selectable={true}
               select={this.handleDateSelect}
               selectMirror={true}
               eventClick={this.handleEventClick}
               eventAdd={this.handleEventAdd}
               eventChange={1}
               eventRemove={1}
             />
         </div>
      )
   }
}

export default NewCalendar
