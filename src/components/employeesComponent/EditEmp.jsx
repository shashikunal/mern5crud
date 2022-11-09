import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "./../../services/AxiosInstance";

const EditEmp = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let [updateEmp, setUpdateEmp] = useState({
    emp_name: "",
    emp_salary: "",
    emp_designation: "",
    gender: "",
  });

  let { emp_name, emp_salary, emp_designation, gender } = updateEmp;
  let handleChange = e => {
    let { name, value } = e.target;
    setUpdateEmp({ ...updateEmp, [name]: value });
  };

  useEffect(() => {
    try {
      let fetchData = async () => {
        let { data } = await axiosInstance.get(`/employees/${id}`);
        setUpdateEmp(data);
      };
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  }, [id]);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      let payload = { emp_name, emp_salary, emp_designation, gender };
      await axiosInstance.put(`/employees/${id}`, payload);
      // navigate("/");
      window.location.assign("/");
      toast.success(`successfully ${updateEmp.emp_name} is updated`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <section className="formBlock">
      <article>
        <h2>Update {updateEmp.emp_name} information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emp_name">Employee name</label>
            <input
              type="text"
              className="form-control"
              name="emp_name"
              value={emp_name}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emp_salary">Employee Salary</label>
            <input
              type="text"
              className="form-control"
              name="emp_salary"
              required
              value={emp_salary}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="emp_designation">Employee Designation</label>
            <select
              name="emp_designation"
              value={emp_designation}
              onChange={handleChange}
            >
              <option value="java_dev">Java Developer</option>
              <option value="node_dev">Nodejs Developer</option>
              <option value="frontend_dev">frontend Developer</option>
              <option value="api_dev">Api Developer</option>
            </select>
          </div>
          <div
            className="form-group"
            name="gender"
            value={gender}
            onChange={handleChange}
          >
            <label htmlFor="gender">Employee Gender</label>
            <input type="radio" name="gender" value="male" checked /> Male
            <input type="radio" name="gender" value="female" />
            Female
            <input type="radio" name="gender" value="others" />
            others
          </div>
          <div className="form-group">
            <button>Update Employee</button>
            <Link to="/">back</Link>
          </div>
        </form>
      </article>
    </section>
  );
};

export default EditEmp;
