import { Link } from "react-router-dom"

const NavBar = ({isAdmin}) => {
    return (
        <div className="NavBar">
            {isAdmin ? 
                <div><Link to="/employees">Employees</Link></div>
                :
                <div><Link to="/timeclock">Clock In/Out</Link></div>
            }
            <div><Link to="/checklist">Checklist</Link></div>
            <div><Link to="/notes">Notes</Link></div>
        </div>
    )
}

export default NavBar;