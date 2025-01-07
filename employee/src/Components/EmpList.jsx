import React,{useState,useEffect} from "react";
import axios from 'axios';





const EmpList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchemp, setSearchEmp] = useState([]);
    const [filteredemp, setFilteredEmp] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({id:null,empid:null,name:'',address:'',position:'',salary:null,experiance:null,phone:null,email:''});

        const handleClick =() =>{
            //force a page reload
            window.location.reload();
        };
        
    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/emp/')
            .then(response => {
                setEmployees(response.data)
                setFilteredEmp(response.data)
            })
            .catch(error => console.log(error));
    
    },[]);


    const deleteEmployee = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/emp/${id}/`)
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
        axios.put(`http://127.0.0.1:8000/api/emp/${id}/`, updateEmployee)
        .then(response => {
            setEmployees(employees.map (employee => (employee.id === id ? response.data : employee)));
        })
        .catch(error => console.log(error));
    };

    useEffect(() =>{
        const result=employees.filter (employee =>
            employee.name.includes(searchemp) || employee.address.includes(searchemp)
        )
        setFilteredEmp(result)
    },[searchemp,employees])
 

    return(
        <>
        <div className="container mt-3">
            <h2>Employee List</h2>
            <input type="text" placeholder="Search" value={searchemp} onChange={(e) => setSearchEmp(e.target.value)} />
            <table className="table table-bordered table-hover text-center">
                <thead>
                    <tr>
                        <td>Empid</td>
                        <td>Name</td>
                        <td>Address</td>
                        <td>Position</td>
                        <td>Salary</td>
                        <td>Experiance</td>
                        <td>Phone</td>
                        <td>Email</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                {filteredemp.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.empid}</td>
                        <td>{employee.name}</td>
                        <td>{employee.address}</td>
                        <td>{employee.position}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.experiance}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.email}</td>
                
                        <td><button className="btn btn-warning px-3" onClick={() => editEmployee(employee)}>Edit</button></td>
                        <td><button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}>Delete</button></td>
                    </tr>
                    
                ))}
                </tbody>
            </table>
            {editing ? (
                <EditEmployeeForm
                currentEmployee={currentEmployee}
                updateEmployee={updateEmployee}
                />
            ): null}
        </div>
        </>
    );
};




const EditEmployeeForm = ({currentEmployee, updateEmployee}) => {
    const[employee, setEmployee] =useState(currentEmployee);

        useEffect( ()=> {
            setEmployee(currentEmployee)
        },[currentEmployee])


const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEmployee({ ...employee, [name]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(employee.id, employee);
};
return(


    
    <form onSubmit={handleSubmit}>
        <h2>Edit Employee</h2>

        <div>
            <label>Emp Id</label>
            <input 
            type="number"
            name="empid"
            value={employee.empid}
            onChange={handleInputChange}
            />
        </div>


        <div>
            <label>Name</label>
            <input 
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            />
        </div>


        <div>
        <label>Address</label>
            <textarea
            name="address"
            value={employee.address}
            onChange={handleInputChange}
            />
        </div>

        <div>
            <label>Position</label>
            <input 
            type="text"
            name="position"
            value={employee.position}
            onChange={handleInputChange}
            />
        </div>

        <div>
            <label>Salary</label>
            <input 
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleInputChange}
            />
        </div>

        <div>
            <label>Experiance</label>
            <input 
            type="number"
            name="experiance"
            value={employee.experiance}
            onChange={handleInputChange}
            />
        </div>

        <div>
            <label>Phone</label>
            <input 
            type="number"
            name="phone"
            value={employee.phone}
            onChange={handleInputChange}
            />
        </div>

        <div>
            <label>Email</label>
            <input 
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            />
        </div>




        <button type="submit">Update Employee</button>
    </form>
)
};
export default EmpList;