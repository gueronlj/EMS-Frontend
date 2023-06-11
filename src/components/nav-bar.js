import { Link } from "react-router-dom"

const NavBar = ({isAdmin}) => {
    return (
        <div className="NavBar">
            {isAdmin ? 
                <Link to="/">Employees</Link>
                :
                <Link to="/">Clock In/Out</Link>
            }
            <Link to="/checklist">Checklist</Link>
            <Link to="/notes">Notes</Link>
        </div>
    )
}

export default NavBar;