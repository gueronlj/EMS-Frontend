import GenerateReport from '@components/Report/generate-report.js'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect, useRef } from 'react'
import { getEmployeeId } from '@components/BasicDashboard/Helpers/getEmployeeId.js'

const SelfReport = ( { user, alert } ) => {

   const [totalDays, setTotalDays] = useState(0)
   const [totalHours, setTotalHours] = useState(0)
   const [totalDoubles, setTotalDoubles] = useState(0)
   const [totalSingles, setTotalSingles] = useState(0)
   const [startLimit, setStartLimit] = useState(new Date('1,1,2023'))
   const [endLimit, setEndLimit] = useState(new Date())
   const [shiftData, setShiftData] = useState({})

   const { getAccessTokenSilently } = useAuth0()
   const EMPLOYEE_ID = useRef('')

   const fetchReport = async () => {
      const ENDPOINT = process.env.REACT_APP_DEV_URI
      let startISO = startLimit.toISOString()
      let endISO = endLimit.toISOString()

      try{
         const token = await getAccessTokenSilently();
         const options = {
            method: 'GET',
            url: `${ENDPOINT}/report/${EMPLOYEE_ID.current}/${startISO}/${endISO}`,
            headers: {
              Authorization: `Bearer ${token}`
            }
         }
         const response = await axios(options)
         setShiftData(response.data.schedule)
         setTotalDays(response.data.totalDays)
         setTotalHours(response.data.totalHours)
      } catch(error) { console.log(error) }
   }

   useEffect(() => {
      EMPLOYEE_ID.current = getEmployeeId(user.email)
      fetchReport()
   },[alert])

   return(
      <Paper>
         <div className="SelfReport">
            <h2>Total Stats</h2>
            <li>Days: {totalDays}</li>
            <li>Hours: {totalHours}</li>
            <li>Doubles: Coming Soon</li>
            <li>Singles: Coming Soon</li>
         </div>
      </Paper>
   )
}

export default SelfReport;
