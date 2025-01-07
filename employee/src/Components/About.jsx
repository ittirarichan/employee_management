import React, { useState} from 'react';
import axios from 'axios';

const AddEmp = () => {
    const [empid,setEmpid] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [experiance, setExperiance] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleClick =() =>{
        //force a page reload
        window.location.reload();
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/emp/',{ empid, name, address, position, salary, experiance, phone, email })
            .then(response => {
                console.log(response.data);
                setEmpid('');
                setName('');
                setAddress('');
                setPosition('');
                setSalary('');
                setExperiance('');
                setPhone('');
                setEmail('');
            })
            .catch(error => console.log(error));
            handleClick()
}


return(
    <div className='container w-50'>
    <form onSubmit={handleSubmit}>
        <h2 className='text-info'><u>Add Employee</u></h2>

        <div>
            <label className='text-dark'>Emp Id</label>
            <input 
            className='form-control'
            type='number'
            value={empid}
            onChange={(e) => setEmpid(e.target.value)} 
            />
        </div>

        <div className='text-dark mt-2'>
            <label >Name</label>
            <input 
            className='form-control'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)} 
            />
        </div>

        <div className='mt-2'>
            <label> Address</label>
            <textarea
                className='form-control'
                value={address}
                onChange={(e) => setAddress(e.target.value)}            
            />
        </div>

        <div className='text-dark mt-2'>
            <label>Position</label>
            <input 
            className='form-control'
            type='text'
            value={position}
            onChange={(e) => setPosition(e.target.value)} 
            />
        </div>

        <div className='text-dark mt-2'>
            <label>Salary</label>
            <input 
            className='form-control'
            type='number'
            value={salary}
            onChange={(e) => setSalary(e.target.value)} 
            />
        </div>

        <div className='text-dark mt-2'>
            <label>Experiance</label>
            <input 
            className='form-control'
            type='number'
            value={experiance}
            onChange={(e) => setExperiance(e.target.value)} 
            />
        </div>

        <div className='text-dark mt-2'>
            <label>Phone</label>
            <input 
            className='form-control'
            type='number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)} 
            />
        </div>

        <div className='text-dark mt-2'>
            <label>Email</label>
            <input 
            className='form-control'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            />
        </div>


        <button type="submit" className="btn btn-success mt-3">Add Employee</button>
    </form>
    </div>
    );
}

export default AddEmp;