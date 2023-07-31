import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  let resData;
  const getData = async () => {
    const res = await axios.post("http://localhost:9000/login", data);
    localStorage.setItem("token", res.data.token);
    resData = res.data.findData;
    if (res.data.findData.role == "Admin") {
      navigate("/adminPage");
    } else {
      navigate("/devoteesPage", { state: resData });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await getData();
  };

  return (
    <>
      <div className="container">
        <form className="m-5 w-50" onSubmit={handleSubmit}>
          <div className="form-group m-2">
            <label htmlFor="exampleInputPassword1">Name:</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Name"
              name="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="form-group m-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            />
          </div>
          {/* <div className="form-group m-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div> */}
          <button type="submit" className="btn btn-primary m-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
