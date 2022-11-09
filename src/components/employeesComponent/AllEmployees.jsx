import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { EmployeeContextApi } from "./../../contextApi/EmployeeContext";
import axiosInstance from "./../../services/AxiosInstance";
import { toast } from "react-toastify";

const AllEmployees = () => {
  let { employees, loading } = useContext(EmployeeContextApi);
  let removeEmp = async id => {
    try {
      await axiosInstance.delete(`/emp/${id}`);
      toast.success("employee deleted");
      window.location.assign("/");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <section id="empTableBlock">
      <article>
        <h1>List of Employees</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>salary </th>
              <th>designation</th>
              <th>gender</th>
              <th>skills</th>
              <th>city</th>
              <th>phone</th>
              <th>exp</th>
              <th>edu</th>
              <th>email</th>
              <th>details</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {loading === true
              ? "loading"
              : employees?.map(emp => {
                  return (
                    <tr key={emp.id}>
                      <td>{emp.emp_id}</td>
                      <td>{emp.emp_name}</td>
                      <td>
                        <span>&#x20b9;</span>
                        {emp.emp_salary}{" "}
                      </td>
                      <td>{emp.emp_designation}</td>
                      <td>{emp.emp_gender}</td>
                      <td>{emp.emp_skills}</td>
                      <td>{emp.emp_city}</td>
                      <td>{emp.emp_phone}</td>
                      <td>{emp.emp_edu}</td>
                      <td>{emp.emp_exp}</td>
                      <td>{emp.emp_email}</td>
                      <td className="view_more">
                        <Link to={`/view-emp/${emp.id}`}>view more</Link>
                      </td>
                      <td className="edit_block">
                        <Link to={`/edit-emp/${emp.id}`}>Edit</Link>
                      </td>
                      <td className="delete_block">
                        <button onClick={() => removeEmp(emp.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default AllEmployees;
