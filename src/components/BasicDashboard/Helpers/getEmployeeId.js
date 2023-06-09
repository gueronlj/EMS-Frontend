import { EMPLOYEE_INFO } from '../../../config.js'

export const getEmployeeId = ( email ) => {
  const array = EMPLOYEE_INFO
  let obj = array.find(o => o.email === email )
  return obj.id 
}
