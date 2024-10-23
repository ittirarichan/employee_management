import React,{useState,useEffect} from "react";
import axios from 'axios';


const EmpList = () => {
    const [employees, setEmployees] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({id:null,name:'',address:''});


    useEffect(() => {
        axios.get('https://aiswarya2325.pythonanywhere.com/employemanagement/employees/')
            .then(response => setEmployees(response.data))
            .catch(error => console.log(error));
    
    },[]);


    const deleteEmployee = (id) => {
        axios.delete(`https://aiswarya2325.pythonanywhere.com/employemanagement/employees/${id}/`)
        .then(response => {
            setEmployees(employees.filter (employee => employee.id !== id ));
        })
        .catch(error =>  console.log(error));
    };


    const editEmployee = (employee) => {
        setEditing(true);
        setCurrentEmployee(employee);
    };

    const updateEmployee = (id, updateEmployee) => {
        setEditing(false);
        axios.put(`https://aiswarya2325.pythonanywhere.com/employemanagement/employees/${id}/`, updateEmployee)
        .then(response => {
            setEmployees(employees.map (employee => (employee.id === id ? response.data : employee)));
        })
        .catch(error => console.log(error));
    };


    return(
        <div className="container mt-3">
            <h2>Employee List</h2>
            <table className="table table-bordered table-hover">
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.address}</td>
                        <td><button className="btn btn-warning px-3" onClick={() => editEmployee(employee)}>Edit</button></td>
                        <td><button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>Delete</button></td>
                    </tr>
                ))}
            </table>
            {editing ? (
                <EditEmployeeForm
                currentEmployee={currentEmployee}
                updateEmployee={updateEmployee}
                />
            ): null}
        </div>
    );
};




const EditEmployeeForm = ({currentemployee, updateemployee}) => {
    const[employee, setemployee] =useState(currentemployee);


const handleInputChange = (e) => {
    const {name, value} = e.target;
    setemployee({ ...employee, [name]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    updateemployee(employee.id, employee);
};
return(
    <form onSubmit={handleSubmit}>
        <h2>Edit Employee</h2>
        <div>
            <label>Employee</label>
            <input 
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            />
        </div>
        <div>
        <label>Discription</label>
            <textarea
            name="discription"
            value={employee.address}
            onChange={handleInputChange}
            />
        </div>
        <button type="submit">Update Employee</button>
    </form>
)
};
export default EmpList;