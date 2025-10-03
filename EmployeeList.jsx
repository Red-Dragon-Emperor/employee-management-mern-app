import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style/EmployeeList.css';

export function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/employees");
            setEmployees(res.data);
        } catch (err) {
            alert("Error fetching employees");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const deleteEmployee = async (empNo) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3001/api/employees/${empNo}`);
            fetchEmployees();
        } catch (err) {
            alert("Error deleting employee");
        }
    };

    return (
        <div className="employee-list-page">
            <div className="employee-container">
                <h2>Employee List</h2>
                <div className="top-bar">
                    <button className="btn-add" onClick={() => navigate("/add")}>
                        ➕ Add Employee
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Emp No</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="empty-msg">No employees found.</td>
                            </tr>
                        ) : (
                            employees.map(emp => (
                                <tr key={emp._id}>
                                    <td>{emp.empNo}</td>
                                    <td>{emp.empName}</td>
                                    <td>{emp.empSal}</td>
                                    <td className="action-buttons">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/edit/${emp.empNo}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => deleteEmployee(emp.empNo)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
