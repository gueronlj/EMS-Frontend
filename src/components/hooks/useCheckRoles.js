import { useEffect, useState } from "react"
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'

export const useCheckRoles = ( userEmail ) => {
  const MANAGEMENT_API = process.env.REACT_APP_AUTH0_MANAGEMENT_API_ENDPOINT
  const ROLE_ID = 'rol_ROK8QCfQY4OhDzPA'
  const SERVER_URL = process.env.REACT_APP_DEV_URI

  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading]= useState(true);
  const [adminArray, setAdminArray] = useState([]);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false)

  const fetchListofAdmins = async ()=>{
    const envtoken = process.env.REACT_APP_AUTH0_MANAGEMENT_API_TOKEN
    try{
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${SERVER_URL}/admin`,
          scope: 'read:roles',
        }
      })
      const options = {
        method: 'GET',
        url: `${MANAGEMENT_API}roles/${ROLE_ID}/users`,
        headers: {
          Authorization: `Bearer ${envtoken}`
        }
      }
      const response = await axios(options)
      console.log(response.data);
      setAdminArray(response.data)
    }catch(error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  const findUserOnAdminList = async ( userEmail ) => {
    for (const ele of adminArray){
      userEmail === ele.email &&
        console.log('admin found');
        setIsAdmin(true)
    }
  }

  useEffect(() => {
    fetchListofAdmins()
    findUserOnAdminList(userEmail)
  }, []);

  return {isAdmin, error, loading}
}
