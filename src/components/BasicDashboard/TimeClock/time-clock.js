const TimeClock = ({clockIn, clockOut, clockInDisabled, clockOutDisabled}) => {
    return(
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
    )
}

export default TimeClock;