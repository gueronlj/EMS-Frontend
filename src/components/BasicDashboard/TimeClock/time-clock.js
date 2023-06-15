import SelfReport from '@components/BasicDashboard/SelfReport/SelfReport.js'

const TimeClock = ({clockIn, clockOut, clockInDisabled, clockOutDisabled, user, alert}) => {
   return(
      <div id="time-clock">
         <div id="time-clock-left">
            <SelfReport
               user={user}
               alert={alert}/>
         </div>
         <div className ="quick-menu">
            <div className = "clock-in-out">
               <button id={new Date().toLocaleTimeString()} className="clock-in-btn" innerText="start" onClick={clockIn} disabled={clockInDisabled}>
                 Clock-In
               </button>
               <button id={new Date().toLocaleTimeString()} className="clock-out-btn" innerText="end" onClick={clockOut} disabled={clockOutDisabled}>
                 Clock-Out
               </button>
            </div>
         </div>
      </div>
   )
}

export default TimeClock;
