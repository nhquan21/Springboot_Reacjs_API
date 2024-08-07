import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeServices";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponents = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();
  
  useEffect(() => {
    getAllEmployee();
  }, []);
  function getAllEmployee(){
    listEmployees()
      .then((reponse) => {
        setEmployees(reponse.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addNewEmployee() {
    navigator("/add-employee");
  }
  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }
  function removeEmployee(id){
    console.log(id);
    deleteEmployee(id).then((response)=>{
      getAllEmployee();
    }).catch(error=>{
      console.error(error);
    })
  }
  return (
    <div className="container">
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <h2>List of Employees</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.email}</td>
              <td>
                <button className="btn btn-info" onClick={()=> updateEmployee(e.id)}>Update</button>
                <button className="btn btn-danger m-2" onClick={()=> removeEmployee(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponents;
