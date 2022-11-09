import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./../../services/AxiosInstance";

import { faker } from "@faker-js/faker";

const Employee = () => {
  const randomPhoto = faker.image.avatar();

  let [emp, setEmp] = useState("");
  let { id } = useParams();
  useEffect(() => {
    let fetchData = async () => {
      let { data } = await axiosInstance.get(`/employees/${id}`);
      setEmp(data);
    };
    fetchData();
  }, [id]);

  return (
    <section className="emp_block">
      <article>
        <aside className="sidebar">
          <figure>
            <img src={randomPhoto} alt={emp.emp_name} />
          </figure>
        </aside>
        <aside className="mainbar">
          <h1>{emp.emp_name}</h1>
          <p>Employee Salary : {emp.emp_salary}</p>
          <p>Employee Designation : {emp.emp_designation}</p>
          <p>Employee Gander : {emp.gender}</p>
        </aside>
      </article>
    </section>
  );
};

export default Employee;
