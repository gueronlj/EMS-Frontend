import AddEmployeeButton from '@components/Buttons/new-employee-button.js'
import Login from '@components/Buttons/login.js'
import Logout from '@components/Buttons/logoutButton.js'

const Header = ( { isAdmin, user, showNewEmployeeModal, setShowNewEmployeeModal } ) => {
  return (
    <div className="header">
      <h4 className="user-name">Hello, {user.name}</h4>
      {isAdmin &&
        <AddEmployeeButton
          showNewEmployeeModal={showNewEmployeeModal}
          setShowNewEmployeeModal={setShowNewEmployeeModal}/>
      }
      <Login />
      <Logout />
    </div>
  );
}

export default Header;
