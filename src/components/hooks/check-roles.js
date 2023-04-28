import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'

const CheckRoles = ( userEmail ) => {
  const MANAGEMENT_API = process.env.REACT_APP_AUTH0_MANAGEMENT_API_ENDPOINT
  const ROLE_ID = 'rol_ROK8QCfQY4OhDzPA'
  const SERVER_URL = process.env.REACT_APP_DEV_URI

  const { getAccessTokenSilently } = useAuth0();

  let adminArray = [];

  const fetchListofAdmins = async ()=>{
    try{
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${SERVER_URL}/admin`,
          scope: 'read:roles',
        }
      })
      console.log(token);
      const options = {
        method: 'GET',
        url: `${MANAGEMENT_API}roles/${ROLE_ID}/users`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.request(options)
      console.log(response.data);
      // var options = {
      //   method: 'POST',
      //   url: 'https://dev-rqbvmubwc6xeogdn.us.auth0.com/oauth/token',
      //   headers: {'content-type': 'application/x-www-form-urlencoded'},
      //   data: new URLSearchParams({
      //     grant_type: 'client_credentials',
      //     client_id: CLIENT_ID,
      //     client_secret: CLIENT_SECRET,
      //     audience: 'https://dev-rqbvmubwc6xeogdn.us.auth0.com/api/v2/'
      //   })
      // };
      //
      // const response = axios.request(options)
      // console.log(response.data);
      adminArray = (response.data)
    }catch(error) {
      console.log(error);
    }
  }

  const findUserOnAdminList = async ( userEmail ) => {
    for (const ele of adminArray){
      userEmail === ele.email &&
        console.log('admin found');
        return(true)
    }
  }

  fetchListofAdmins()
  if (findUserOnAdminList(userEmail) === true){
    return true
  }else{
    return false
  }
}

export default CheckRoles
