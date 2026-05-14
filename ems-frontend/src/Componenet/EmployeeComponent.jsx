import React,{useEffect, useState} from 'react'
import { useNavigate,useParams} from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeServices';

export const EmployeeComponent = () => {
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName] =useState('');
    const [email,setEmail] =useState('');
    const navigator = useNavigate();
    const {id} = useParams();
   
    useEffect(()=>{
        if(id)
        
        getEmployee(id).then(response=>{
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        })
    
        .catch(error=>{
                console.error(error);
            })


    },[id])
    const [error,setError] =useState(
        {
        firstName:"",
        lastName:"",
        email:""
    }
);

    function handleFirstName(p){
        setFirstName(p.target.value);

    }

      function handleLastName(p){
        setLastName(p.target.value);

    }

      function handleEmail(p){
        setEmail(p.target.value);

    }

    function saveOrUpdateEmployee(p){
        p.preventDefault();
        if(validateForm()){
            const employee ={firstName,lastName,email};
            console.log(employee);

            if(id){
                updateEmployee(id,employee).then(response=>{
            console.log(response.data);
            navigator('/employees');
                }).catch(error=>console.log(error));
            }
            else{

        createEmployee(employee)
        .then(response=>{
           console.log(response.data);
           navigator("/employees");})
           .catch(error=>console.error(error));
        }
        
        }
        

    }

    function validateForm(){
        let valid = true;
        const errorCopy ={...error}
    if(firstName.trim()){
            errorCopy.firstName='';
        }
    else{
            errorCopy.firstName='First name is required'
            valid = false;
        }

        if(lastName.trim()){
            errorCopy.lastName='';
        }
    else{
            errorCopy.lastName='Last name is required'
            valid = false;
        }
        
        if(email.trim()){
            errorCopy.email='';
        }
    else{
            errorCopy.email='Email is required'
            valid = false;
        }

        setError(errorCopy);
        return valid;
    }
    function pageTitle(){
        if(id)
            return  <h2 className='text-center'>Update Employee</h2>
        else
           return <h2 className='text-center'>Add Employee</h2>

    }
  return (
    <div>
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3' >
                     {pageTitle()}
                     <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input type="text" placeholder='Enter employee first name'name='firstname'
                                 value={firstName} className={`form-control ${error.firstName?'is-invalid':''}`} onChange={handleFirstName}/>
                            {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
                            </div>
                             <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input type="text" placeholder='Enter employee last name'name='lastname'
                                 value={lastName} className={`form-control ${error.lastName ?'is-invalid':''}`} onChange={handleLastName}/>
                            {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
                        
                            </div>
                       <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input type="text" placeholder='Enter employee mail id'name='mail'
                                 value={email} className={`form-control ${error.email ?'is-invalid':''}`} onChange={handleEmail}/>
                            {error.email && <div className='invalid-feedback'>{error.email}</div>}
                           
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                     </div>
                </div>
            </div>

        </div>
    </div>
  )
}
