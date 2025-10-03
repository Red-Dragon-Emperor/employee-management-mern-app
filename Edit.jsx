import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../style/Edit.css";
import { useParams, useNavigate } from "react-router-dom";

export function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [empNo, setEmpNo] = useState("");
  const [empName, setEmpName] = useState("");
  const [empSal, setEmpSal] = useState("");

  const empNoRef = useRef(null);
  const empNameRef = useRef(null);
  const empSalRef = useRef(null);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await axios.get(`http://localhost:3001/api/employees/${id}`);
        const emp = res.data;
        setEmpNo(emp.empNo);
        setEmpName(emp.empName);
        setEmpSal(emp.empSal);
      } catch (err) {
        alert("Error fetching employee details");
      }
    }
    fetchEmployee();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!empNo || !empName || !empSal) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/api/employees/${id}`, {
        empNo,
        empName,
        empSal: parseFloat(empSal)
      });
      alert("Employee updated successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update employee");
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
    <div className="edit-bg">
      <div className="editform-container">
        <h2 className="form-title">Edit Employee</h2>
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="empNo">Employee Number</label>
            <input
              id="empNo"
              type="number"
              value={empNo}
              onChange={(e) => setEmpNo(e.target.value)}
              ref={empNoRef}
              onKeyDown={(e) => handleKey(e, empNoRef)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="empName">Employee Name</label>
            <input
              id="empName"
              type="text"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
              ref={empNameRef}
              onKeyDown={(e) => handleKey(e, empNameRef)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="empSal">Employee Salary</label>
            <input
              id="empSal"
              type="number"
              value={empSal}
              onChange={(e) => setEmpSal(e.target.value)}
              ref={empSalRef}
              onKeyDown={(e) => handleKey(e, empSalRef)}
              required
            />
          </div>

          <div className="form-group center">
            <button type="submit" className="btn-update">Update Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}
