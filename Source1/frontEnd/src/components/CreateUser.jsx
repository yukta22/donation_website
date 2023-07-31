import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const CreateUser = () => {
  const [data, setData] = useState({});
  const [flag, setFlag] = useState(false);
  // const [arr, setArr] = useState([]);
  const [editData, setEditData] = useState(false);
  const [file, setFile] = useState();
  const [formError, setFormerror] = useState({});
  const [otp, setOtp] = useState({});
  const navigate = useNavigate();
  const { state } = useLocation();

  // useEffect(() => {
  //   axios.get(`http://localhost:9000/user/${state?._id}`).then((response) => {
  //     setData(response.data);
  //   });
  // }, []);

  const handleOtp = (e) => {
    setOtp({ [e.target.name]: e.target.value });
  };

  const checkOtp = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = async () => {
    const res = await axios.post("http://localhost:9000/getOtp", otp);
    if (res.data != "Otp found") {
      alert("Please enter correct otp");
    } else {
      navigate("/adminPage");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };

  const validation = () => {
    const err = {};

    let flag = false;

    if (!isNaN(data.firstName)) {
      err.firstName = "Please enter valid name";
      flag = true;
    }
    if (!isNaN(data.middleName)) {
      err.middleName = "Please enter valid name";
      flag = true;
    }
    if (!isNaN(data.lastName)) {
      err.lastName = "Please enter valid name";
      flag = true;
    }
    setFormerror(err);
    return flag;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("middleName", data.middleName);
      formData.append("lastName", data.lastName);
      formData.append("image", file);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (editData) {
        await editUser(formData);
      } else {
        await registerUser(formData);
      }
      // e.target.reset();
      // setData({});
    }
  };

  const registerUser = async (formData) => {
    const res = await axios.post("http://localhost:9000/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.message == "User is already exist") {
      alert("User is already exist");
    } else {
      setFlag(true);
    }
  };

  const editUser = async (formData) => {
    console.log(formData);
    const res = await axios.put(
      `http://localhost:9000/updateUser/${state._id}`,
      formData
    );
    console.log(res.data);
  };

  return (
    <>
      <Navbar />
      <form className="m-5 w-50" onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="form-group m-2">
            <label htmlFor="exampleInputPassword1">First Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="firstName"
              value={data?.firstName}
              onChange={handleChange}
              required
            />
            {formError.firstName && (
              <div className="error">{formError.firstName}</div>
            )}
          </div>
          <div className="form-group m-2">
            <label htmlFor="exampleInputPassword1">Middle Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="middleName"
              onChange={handleChange}
              value={data?.middleName}
              required
            />
          </div>
          <div className="form-group m-2">
            <label htmlFor="exampleInputPassword1">Last Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="lastName"
              onChange={handleChange}
              value={data?.lastName}
              required
            />
          </div>
        </div>
        <div className="m-2">
          <label className="form-label " htmlFor="customFile">
            Default file input example
          </label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={(e) => setFile(e.target.files[0])}
            required
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
            value={data?.email}
            required
          />
        </div>
        <div className="m-2">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
            value={data?.password}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={() => setEditData(false)}
        >
          Add user
        </button>
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={() => setEditData(true)}
        >
          Edit User
        </button>
      </form>
      {flag && (
        <form className="ms-5" onSubmit={checkOtp}>
          <label>Enter OTP:</label>
          <input
            type="text"
            className="ms-1"
            name="inputOtp"
            onChange={handleOtp}
          />
          <button type="submit" className="btn btn-primary ms-3">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default CreateUser;
