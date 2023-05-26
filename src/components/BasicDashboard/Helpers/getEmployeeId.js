import { EMPLOYEE_INFO } from '../../../config.js'

export const getEmployeeId = ( string ) => {
  const array = EMPLOYEE_INFO
  let obj = array.find(o => o.email === string );
  return obj.id
}
