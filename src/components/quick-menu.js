
const QuickMenu = (props) => {

   return(
      props.selectedEmployee &&(<>
         <h4>{props.selectedEmployee.name}</h4>
         <div className="quickMenu">
            <div>
               <button onClick={1}>
                  Clock-In
               </button>
            </div>
            <div>
               <button onClick={1}>
                  Clock-Out
               </button>
            </div>
            <div>
               <button onClick={1}>
                  Add Lunch
               </button>
            </div>
            <div>
               <button onClick={1}>
                  Add Dinner
               </button>
            </div>
            <div>
               <button onClick={1}>
                  Add Double
               </button>
            </div>
         </div>
         <div className="quickMessage">
            quickMessage here
         </div>
      </>)
   )
}

export default QuickMenu
