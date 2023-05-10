import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'

const CheckRoles = ( userEmail ) => {
  const MANAGEMENT_API = process.env.REACT_APP_AUTH0_MANAGEMENT_API_ENDPOINT
  const ROLE_ID = 'rol_ROK8QCfQY4OhDzPA'
  const SERVER_URL = process.env.REACT_APP_DEV_URI
  const CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

  const { getAccessTokenSilently } = useAuth0();

  let adminArray = [];

  const fetchListofAdmins = async ()=>{
    try{
      // const token = await getAccessTokenSilently({
      //   authorizationParams:{
      //     audience:'https://dev-rqbvmubwc6xeogdn.us.auth0.com/userinfo',
      //     scope: 'openid'
      //   }
      // })
      var opt = {
        method: 'POST',
        url: 'https://dev-rqbvmubwc6xeogdn.us.auth0.com/oauth/token',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'http://localhost:3000'
        },
        data:{
          grant_type: 'client_credentials',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          audience: 'https://dev-rqbvmubwc6xeogdn.us.auth0.com/api/v2/'
        }
      };

      const res = axios.request(opt)
      console.log(res.data);
      // console.log(token);
      // const options = {
      //   method: 'GET',
      //   url: `${MANAGEMENT_API}roles/${ROLE_ID}/users`,
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // }
      //const response = await axios.request(options)
      //adminArray = (response.data)
    }catch(error) {
      console.log(error.message);
    }
  }

  const findUserOnAdminList = async ( userEmail ) => {
    for (const ele of adminArray){
      if(userEmail === ele.email){
        return(true)
      }
    }
  }

  fetchListofAdmins()
  if (findUserOnAdminList(userEmail)){
    return true
  }else{
    return false
  }
}

export default CheckRoles
