import React, { useEffect, useState } from "react";
import { createEmployee,getEmployee, updateEmployee } from "../services/EmployeeServices";
import { useNavigate,useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const {id} = useParams();
  const [errors, setErrors ] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const navigator = useNavigate();
  useEffect(()=>{
    if (id) {
      getEmployee(id).then((response)=>{
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error=>{
          console.error(error)
      })
    }
  }, [id])
  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      if (id) {
        updateEmployee(id,employee).then((response)=>{
          console.log(response.data)
          navigator('/employees');
        }).catch(errors=>{
          console.error(errors);
        })
      }else{
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(errors=>{
          console.error(errors);
        })
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }
    
    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
    setErrors (errorsCopy);
    return valid;
  }
  function pageTitle(){
    if (id) {
      return <h2 className="text-center">Update Employee</h2>
    }else{
      return <h2 className="text-center">Add Employee</h2>
    }
  }
  function cancelEmployee(){
    navigator('/employees')
  }
  return (
    <div className="container">
      <div className="row">
        <div className="card">
          {
            pageTitle()
          }
          <div className="card-body">
            <form>
              <input type="hidden"name="id"
                  value={id} />
              <div className="form-group">
                <label>FirstName</label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  name="lastName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && 
                  <div className='invalid-feedback'> {errors.firstName}</div>
                }
              </div>
              <div className="form-group">
                <label>LastName</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? 'is-invalid' : ''
                  }`}
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && 
                  <div className='invalid-feedback'> {errors.email}</div>
                }
              </div>
              <button onClick={saveOrUpdateEmployee} className="btn btn-primary">
                Save
              </button>
              <button onClick={cancelEmployee} className="btn btn-danger m-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
