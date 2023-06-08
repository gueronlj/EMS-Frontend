import { useAuth0 } from '@auth0/auth0-react'
import {useState} from 'react'
import Details from '@components/Employees/employee-details.js'
import Schedule from '@components/Schedule/simple-schedule.js'
import GenerateReport from '@components/Report/generate-report.js'
import Paper from '@mui/material/Paper'
import ReportFilters from '@components/Report/report-filters.js'

const Profile = (props) => {
  const {isLoading} = useAuth0();
  const [editTarget, setEditTarget] = useState({id:'', name:'', value:null})
  const [totalDays, setTotalDays] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const [totalDailyWages, setTotalDailyWages] = useState(0)
  const [totalHourlyWages, setTotalHourlyWages] = useState(0)

  if (isLoading) return <p>Loading...</p>
  return (
    props.selectedEmployee &&(
      <>
        {props.detailsView?<>
          <h1>{props.selectedEmployee.name}'s Time Sheet</h1>
          <Paper elevation={3}>
            <div className = "details-card">
              <div className="details-top">
                <h2>Filter by date range</h2>
                <div className="report-filters">
                  <ReportFilters
                    setSchedule={props.setSchedule}
                    selectedEmployee={props.selectedEmployee}
                    setTotalDays={setTotalDays}
                    setTotalHours={setTotalHours}
                    setTotalHourlyWages={setTotalHourlyWages}
                    setTotalDailyWages={setTotalDailyWages}/>
                </div>
              </div>
              <div className="details-bottom">
                <GenerateReport
                  totalDays={totalDays}
                  totalHours={totalHours}
                  totalHourlyWages={totalHourlyWages}
                  totalDailyWages={totalDailyWages}/>
                <Details
                  selectedEmployee={props.selectedEmployee}
                  setShowEditModal={props.setShowEditModal}
                  setDetailsView={props.setDetailsView}/>
              </div>
            </div>
          </Paper>
          <Schedule
             selectedEmployee={props.selectedEmployee}
             editTarget={editTarget}
             setEditTarget={setEditTarget}
             setEditMode={props.setEditMode}
             editMode={props.editMode}
             schedule={props.schedule}
             fetchSchedule={props.fetchSchedule}
             setFeedbackAlert={props.setFeedbackAlert}
             setMessage={props.setMessage}/>
        </>:null}
      </>
    )
  )
}
export default Profile
