import Axios from 'axios';

const REST_API_BASE_URL ='http://localhost:8080/api/employees'

export const listEmployees =()=>Axios.get(REST_API_BASE_URL);

export const createEmployee =(employee)=>Axios.post(REST_API_BASE_URL,employee);

export const getEmployee = (employeeId)=>Axios.get(REST_API_BASE_URL+'/'+employeeId);

export const updateEmployee =(employeeId,employee)=> Axios.put(REST_API_BASE_URL+'/'+employeeId,employee);

export const deleteEmployee =(employeeId)=>Axios.delete(REST_API_BASE_URL+'/'+employeeId);