<<<<<<< HEAD
import React , {Component} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
// import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios'

class NewCalendar extends Component {
   state = {
      currentEvents:null,
   }

   calendarRef = React.createRef()
   const URI = process.env.DEVELOPMENT_URI;

   handleDateSelect = (selectInfo) => {
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
      this.handleEventAdd(selectInfo)
   }

   //-----------------Remove event from calendar on click
   handleEventClick = (clickInfo) => {
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
         clickInfo.event.remove()
         this.handleEventRemove(clickInfo)
      }
   }

   //-----------------Populate Calendar from database (1 employee)
   fetchEvents = () => {
         //call API, search by employee ID
         axios
            .get(`${URI}/admin/${this.props.selectedEmployee}`)
            .then((response) => {
               let events = response.data.schedule
               this.populateCalendar(events)
            })
            .catch((error) => {console.log(error)})
   }

   populateCalendar=(array) => {
      let calendarApi = this.calendarRef.current._calendarApi.view.calendar
      array.forEach(item => {
         calendarApi.addEvent(item)
      });
   }



   handleEvents = (events) => {
      this.setState({currentEvents: events})
   }

   renderEventContent = (eventInfo) => {
     return (
       <>
         <b>{eventInfo.timeText}</b>
         <i>{eventInfo.event.title}</i>
       </>
     )
   }
//===============Databse Helpers=============
   //---------Remove event
   handleEventRemove = (e) => {
      console.log('attempting to remove from db');
      let body = {
         start: e.startStr
      }
      axios
         .put(`${URI}/schedule/${this.props.selectedEmployee}/remove`, body)
         .then((response) => {
            console.log('removal success!!');
         })
         .catch((error) => {
            console.log(error);
         })
   }
   //---------Add event
   handleEventAdd = (e) => {
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
      axios
      .put(`${URI}/schedule/${this.props.selectedEmployee}/new-shift`,body)
      .then((response, error) => {
         console.log('event added to DB!');
      })
   }
   componentDidMount() {
      console.log(this.props.selectedEmployee);
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
               editable={true}
               selectable={true}
               select={this.handleDateSelect}
               selectMirror={true}
               eventClick={this.handleEventClick}
               // eventAdd={this.handleEventAdd}
               eventContent={this.renderEventContent}
               eventsSet={this.handleEvents}
               // initialEvents={this.state.currentEvents}
             />
         </div>
      )
   }
}

export default NewCalendar
=======
import React , {Component} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
// import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios'

class NewCalendar extends Component {
   state = {
      currentEvents:null,
   }

   calendarRef = React.createRef()

   handleDateSelect = (selectInfo) => {
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
      this.handleEventAdd(selectInfo)
   }

   //-----------------Remove event from calendar on click
   handleEventClick = (clickInfo) => {
      if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
         clickInfo.event.remove()
         this.handleEventRemove(clickInfo)
      }
   }

   //-----------------Populate Calendar from database (1 employee)
   fetchEvents = () => {
         //call API, search by employee ID
         axios
            .get(`http://localhost:3001/admin/${this.props.selectedEmployee}`)
            .then((response) => {
               let events = response.data.schedule
               this.populateCalendar(events)
            })
            .catch((error) => {console.log(error)})
   }

   populateCalendar=(array) => {
      let calendarApi = this.calendarRef.current._calendarApi.view.calendar
      array.forEach(item => {
         calendarApi.addEvent(item)
      });
   }



   handleEvents = (events) => {
      this.setState({currentEvents: events})
   }

   renderEventContent = (eventInfo) => {
     return (
       <>
         <b>{eventInfo.timeText}</b>
         <i>{eventInfo.event.title}</i>
       </>
     )
   }
//===============Databse Helpers=============
   //---------Remove event
   handleEventRemove = (e) => {
      console.log('attempting to remove from db');
      let body = {
         start: e.startStr
      }
      axios
         .put(`http://localhost:3001/schedule/${this.props.selectedEmployee}/remove`, body)
         .then((response) => {
            console.log('removal success!!');
         })
         .catch((error) => {
            console.log(error);
         })
   }
   //---------Add event
   handleEventAdd = (e) => {
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
      axios
      .put(`http://localhost:3001/schedule/${this.props.selectedEmployee}/new-shift`,body)
      .then((response, error) => {
         console.log('event added to DB!');
      })
   }
   componentDidMount() {
      console.log(this.props.selectedEmployee);
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
               editable={true}
               selectable={true}
               select={this.handleDateSelect}
               selectMirror={true}
               eventClick={this.handleEventClick}
               // eventAdd={this.handleEventAdd}
               eventContent={this.renderEventContent}
               eventsSet={this.handleEvents}
               // initialEvents={this.state.currentEvents}
             />
         </div>
      )
   }
}

export default NewCalendar
>>>>>>> 6db1040 (trying to fix clockout function)
