

import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useRef } from 'react';
import '../style/Add.css';

export function Add() {
  const [empNo, setEmpNo] = useState('');
  const [empName, setEmpName] = useState('');
  const [empSal, setEmpSal] = useState('');
  const navigate = useNavigate();

  const empNoRef = useRef(null);
  const empNameRef = useRef(null);
  const empSalRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!empNo || !empName || !empSal) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/employees', {
        empNo, empName, empSal
      });
      alert(response.data.message);
      navigate("/");
    } catch (err) {
      alert("Error: Failed to add employee");
    }
  }

  function handleKey(event, currentRef) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (currentRef === empNoRef) empNameRef.current.focus();
      else if (currentRef === empNameRef) empSalRef.current.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (currentRef === empSalRef) empNameRef.current.focus();
      else if (currentRef === empNameRef) empNoRef.current.focus();
    }
  }

  return (
    <div className="add-bg">
      <div className="form-container">
        <h2 className="form-title">Add Employee</h2>
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="empNo">Employee Number</label>
            <input
              id="empNo"
              type="number"
              value={empNo}
              onChange={e => setEmpNo(e.target.value)}
              ref={empNoRef}
              onKeyDown={e => handleKey(e, empNoRef)}
              placeholder="Enter Employee Number"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="empName">Employee Name</label>
            <input
              id="empName"
              type="text"
              value={empName}
              onChange={e => setEmpName(e.target.value)}
              ref={empNameRef}
              onKeyDown={e => handleKey(e, empNameRef)}
              placeholder="Enter Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="empSal">Employee Salary</label>
            <input
              id="empSal"
              type="number"
              value={empSal}
              onChange={e => setEmpSal(e.target.value)}
              ref={empSalRef}
              onKeyDown={e => handleKey(e, empSalRef)}
              placeholder="Enter Salary"
            />
          </div>

          <div className="form-group center">
            <button type="submit" className="btn-submit">Save Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}