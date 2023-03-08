import axios from 'axios'
import React, {useEffect} from 'react'
import {format, parseISO} from 'date-fns'
import { DataGrid, GridRowsProp, GridColDef, useGridApiEventHandler, useGridApiContext, } from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';

const Schedule = (props) => {
  const URI = 'http://localhost:3001';
   const toggleEdit = () => {
      props.editMode?props.setEditMode(false):props.setEditMode(true)
   }

   const handleClick = (e) => {
      toggleEdit()
      let shiftId = e.target.parentElement.id
      let fieldValue = e.target.innerText
      let fieldName = e.target.id
      props.setEditTarget({id:shiftId, name:fieldName, value:fieldValue})
      fetchShiftInfo()
   }

   const handleDelete = async(e) => {
      //TODO:Add confirmation popup
      try{
         let response = await axios
            .put(`${URI}/schedule/${props.selectedEmployee._id}/remove/${e.target.parentElement.dataset.id}`)
            .then(() => {
               props.fetchSchedule()
            })
      }catch(error){console.log(error)}
   }

   const fetchShiftInfo = async () => {
      try{
         let response = await axios
            .get(`${URI}/schedule/${props.selectedEmployee._id}/${props.editTarget.id}`)
            let formData = {
               date:response.data.date,
               start:response.data.start,
               end:response.data.end,
               period:response.data.period
            }
            props.setFormData(formData)
      }catch(error){console.log(error)}
   }

   const butifyTime = (timeObj) => {
      if(timeObj!= null){
         let timeISO = parseISO(timeObj)
         let prettyTime = format(timeISO, 'pp', new Date())
         return prettyTime
      }
   }

   const butifyDate = (dateObj) => {
      if(dateObj!=null){
         let dateISO = parseISO(dateObj)
         let prettyDate = format(dateISO, 'M/d/yyyy', new Date())
         return prettyDate
      }
   }
//===== Doesnt like .map here .WHHY???
   const generateGridRows = () => {
      if(props.schedule){
         const rows =[]
         props.schedule.forEach((shift) => {
            let obj ={
                id:shift.id,
                date:butifyDate(shift.date),
                start:butifyTime(shift.start),
                end:butifyTime(shift.end),
                period:shift.period,
                delete:'-'
             }
             rows.push(obj)
         })
         return rows
      }
   }

   const handleEvent: GridEventListener<'cellClick'> = (
      params,  // GridCellParams
      event,   // MuiEvent<React.MouseEvent<HTMLElement>>
      details, // GridCallbackDetails
   ) => {
         toggleEdit()
         props.setEditTarget({id:event.target.parentElement.dataset.id})
         let shiftId = event.target.parentElement.dataset.id
         let fieldValue = event.target.innerText
         let fieldName = event.target.dataset.field
         if(fieldName === 'delete'){
            console.log('deleting');
            handleDelete(event)
         }else{
            props.setEditTarget({id:shiftId, name:fieldName, value:fieldValue})
            fetchShiftInfo()
         }
      }

   useGridApiEventHandler('cellClick', handleEvent);
   const rows: GridRowsProp = generateGridRows()
   const columns: GridColDef[] = [
      { field: "id", hide: true },
      { field: "date", headerName: "Date", width: 85 },
      { field: "start", headerName: "Clocked-in", width: 95 },
      { field: "end", headerName: "Clocked-out", width: 95 },
      { field: "period", headerName: "L/D", width: 65 },
      { field: "delete", headerName: "-", width: 10},
   ];

   useEffect(() => {
      props.fetchSchedule()
   },[])

return(
   props.schedule && (<>
      <div className='data-grid' style={{ height: 260, width: "100%"}}>
         <DataGrid
            rows={rows}
            columns={columns}
            onCellClick={handleEvent}
            hideFooter={true}
            sx={{m:0,
                border: 1,
                borderColor: 'white',
                '& .MuiDataGrid-cell': {
                  color: 'white',
                  padding: '5px'
                },
                '& .MuiDataGrid-columnHeaders': {
                  color: "#56f4de",
                },
            }}/>
      </div>
   </>)
)
   // return(
   //    <table>
   //       {props.schedule.length ?
   //          <thead>
   //             <tr>
   //                <th>Date</th>
   //                <th>Start</th>
   //                <th>End</th>
   //                <th>L/D</th>
   //             </tr>
   //          </thead>:
   //          <p>No schedule found</p>
   //       }
   //       <tbody>
   //          {props.schedule.map((shift) => {
   //             return(
   //                <tr key={shift.id} id={shift.id}>
   //                   <td onClick={handleClick} id="date">{butifyDate(shift.date)}</td>
   //                   <td onClick={handleClick} id="start">{butifyTime(shift.start)}</td>
   //                   <td onClick={handleClick} id="end">{butifyTime(shift.end)}</td>
   //                   <td onClick={handleClick} id="period">{shift.period}</td>
   //                   <td onClick={handleDelete} >--</td>
   //                </tr>
   //             )})}
   //       </tbody>
   //    </table>
   // )
}

export default Schedule
