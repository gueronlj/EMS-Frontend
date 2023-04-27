import { useEffect, useState } from "react"
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
 
export const useAxiosRequest = (method, url) => {
  const { getAccessTokenSilently } = useAuth0()
  const [loading, setLoading]= useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const fetchData =  async(method, url) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: method,
        url: url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(options)
      console.log(response.data);
      setData(response.data);
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    fetchData(method, url)
  }, []);

  return { data, loading, error };
}
