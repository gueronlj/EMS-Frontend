import React, {useEffect,useRef} from 'react'
import {format, parseISO} from 'date-fns'
import Modal from  '@components/modal.js'
import EditEvent from './simple-edit-event.js'
import {useAxiosRequest} from '@components/hooks/useAxiosRequest.js'

// import { DataGrid, GridRowsProp, GridColDef, useGridApiEventHandler } from "@mui/x-data-grid";
const Schedule = (props) => {
   const URI = process.env.REACT_APP_DEV_URI;
   let shiftData = useRef(null)
   const {data, loading} = useAxiosRequest('GET', `${URI}/schedule/${props.selectedEmployee._id}`)

   const toggleEdit = () => {
      props.editMode?props.setEditMode(false):props.setEditMode(true)
   }

   const handleClick = (e) => {
      toggleEdit()
      props.setEditTarget({id:e.target.parentElement.id})
      shiftData.current = data
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
   /*for when using MuiDataGrid, needs different handleCLick*/
   // const handleClick = (e) => {
   //    toggleEdit()
   //    let shiftId = e.target.parentElement.id
   //    let fieldValue = e.target.innerText
   //    let fieldName = e.target.id
   //    props.setEditTarget({id:shiftId, name:fieldName, value:fieldValue})
   //    fetchShiftInfo()
   // }

   // const handleDelete = async(e) => {
   //    //TODO:Add confirmation popup
   //    try{
   //       let response = await axios
   //          /*for when using MuiDataGrid, needs different selector*/
   //          // .put(`${URI}/schedule/${props.selectedEmployee._id}/remove/${e.target.parentElement.dataset.id}`)
   //          .put(`${URI}/schedule/${props.selectedEmployee._id}/remove/${e.target.parentElement.id}`)
   //          .then(() => {
   //             props.fetchSchedule()
   //          })
   //    }catch(error){console.log(error)}
   // }

  useEffect(() => {
    props.fetchSchedule()
  },[props.selectedEmployee])

  return(<>
    {loading ? <p>Loading...</p> :
      <>
        {props.editMode &&
          <Modal>
            <EditEvent
              setEditMode={props.setEditMode}
              selectedEmployee={props.selectedEmployee}
              editTarget={props.editTarget}
              fetchSchedule={props.fetchSchedule}
              shiftData={shiftData}
              setMessage={props.setMessage}/>
          </Modal>
        }
        <table>
          {props.schedule.length ?
            <thead>
              <tr>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>L/D</th>
              </tr>
            </thead>
          :
            <p>No shifts were found. Try expanding the date range.</p>
          }
          <tbody>
            {props.schedule.map((shift) => {
              return(
                <tr key={shift.id} id={shift.id}>
                  <td id="date">{butifyDate(shift.date)}</td>
                  <td id="start">{butifyTime(shift.start)}</td>
                  <td id="end">{butifyTime(shift.end)}</td>
                  <td id="period">{shift.period}</td>
                  <td className="edit-shift" onClick={handleClick}>Edit</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>}
  </>)
/*===============FOR MuiDataGrid*======================/
//===== Doesnt like .map here .WHHY???
   // const generateGridRows = () => {
   //    if(props.schedule){
   //       const rows =[]
   //       props.schedule.forEach((shift) => {
   //          let obj ={
   //              id:shift.id,
   //              date:butifyDate(shift.date),
   //              start:butifyTime(shift.start),
   //              end:butifyTime(shift.end),
   //              period:shift.period,
   //              delete:'-'
   //           }
   //           rows.push(obj)
   //       })
   //       return rows
   //    }
   // }
   //
   // const handleEvent: GridEventListener<'cellClick'> = (
   //    params,  // GridCellParams
   //    event,   // MuiEvent<React.MouseEvent<HTMLElement>>
   //    details, // GridCallbackDetails
   // ) => {
   //       toggleEdit()
   //       props.setEditTarget({id:event.target.parentElement.dataset.id})
   //       let shiftId = event.target.parentElement.dataset.id
   //       let fieldValue = event.target.innerText
   //       let fieldName = event.target.dataset.field
   //       if(fieldName === 'delete'){
   //          console.log('deleting');
   //          handleDelete(event)
   //       }else{
   //          props.setEditTarget({id:shiftId, name:fieldName, value:fieldValue})
   //          fetchShiftInfo()
   //       }
   //    }
   // useGridApiEventHandler('cellClick', handleEvent);
   // const rows: GridRowsProp = generateGridRows()
   // const columns: GridColDef[] = [
   //    { field: "id", hide: true },
   //    { field: "date", headerName: "Date", width: 85 },
   //    { field: "start", headerName: "Clocked-in", width: 95 },
   //    { field: "end", headerName: "Clocked-out", width: 95 },
   //    { field: "period", headerName: "L/D", width: 65 },
   //    { field: "delete", headerName: "-", width: 10},
   // ];

/* Mui data grid is too difficult to click, must click cell and NOT cell contents */
// return(
//    props.schedule && (<>
//       <div className='data-grid' style={{ height: 260, width: "100%"}}>
//          <DataGrid
//             rows={rows}
//             columns={columns}
//             onCellClick={handleEvent}
//             hideFooter={true}
//             sx={{m:0,
//                 border: 1,
//                 borderColor: 'white',
//                 '& .MuiDataGrid-cell': {
//                   color: 'white',
//                   padding: '5px'
//                 },
//                 '& .MuiDataGrid-columnHeaders': {
//                   color: "#56f4de",
//                 },
//             }}/>
//       </div>
//    </>)
// )
/*===============END of MuiDataGrid code====================*/
}
export default Schedule
