import { useAuth0 } from '@auth0/auth0-react'
import Calendar from './ClassCalendar.js'
import EmployeeList from './employee-list.js'

const Profile = () => {
   const { user, isAuthenticated, isLoading} = useAuth0();
   const [employeeList, setEmployeeList] = useState([])
   const [selectedEmployee, setSelectedEmployee] = useState('636e927ece43e8354b80a56a')
   const URI = process.env.REACT_APP_DEV_URI;
   const updateEmployeeList = async() => {
      try{
         const response = await fetch(`${URI}/admin`);
         const data = await response.json();
         setEmployeeList(data);
      } catch(error){
         console.log(error);
      }
   }

   useEffect(() => {
      updateEmployeeList()
   },[])

   if (isLoading) return <h2>Loading...</h2>

   return (
      isAuthenticated && (
         <div>
            <h2>Hello, {user.name}!</h2>
            <EmployeeList
               setSelectedEmployee={setSelectedEmployee}
               employeeList={employeeList}
               setEmployeeList={setEmployeeList}/>
            <Calendar
               selectedEmployee={selectedEmployee}/>
         </div>
      )
   )
}

export default Profile
