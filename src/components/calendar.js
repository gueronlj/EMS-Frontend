
import React , {Component} from "react";
import {useState, useEffect} from 'react';
import moment from "moment";
import { Calendar, momentLocalizer} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);
// const myEventsList = [
//   { start: new Date('2022-11-11T10:00:00.000Z'), end: new Date('2022-11-11T15:00:00.000Z'), title: "special event" }
// ];

class MonthlyCalendar extends Component {
   state = {
      events: [
        {
         start: moment().toDate(),
         end: moment().add(8, "hours").toDate(),
         title: "Some title",
        },
      ]
   };

   onEventResize = (data) => {
      const { start, end } = data;
      this.setState((state) => {
         state.events[0].start = start;
         state.events[0].end = end;
         return { events: [...state.events] };
      });
      console.log(data);
   };

   onEventDrop = (data) => {
      console.log(data.event);
   };

   onDragStart = (data) => {
      console.log(data.event.start);
   };

   render(){
      return(
         <div className="App">
            <DragAndDropCalendar
               localizer={localizer}
               events={this.state.events}
               style={{ height: 500 }}
               onEventDrop={this.onEventDrop}
               onEventResize={this.onEventResize}
               onDragStart={this.onDragStart}
               onDropFromOutside={console.log()}
               defaultView="week"
               resizable={true}
               selectable={true}
            />
         </div>
      )
   }
}

export default MonthlyCalendar
