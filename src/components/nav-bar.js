import { Link } from "react-router-dom"

const NavBar = ({isAdmin}) => {
    return (
        <div className="NavBar">
            {isAdmin ? 
                <div><Link to="/">Employees</Link></div>
                :
                <div><Link to="/">Clock In/Out</Link></div>
            }
            <div><Link to="/checklist">Checklist</Link></div>
            <div><Link to="/notes">Notes</Link></div>
        </div>
    )
}

export default NavBar;