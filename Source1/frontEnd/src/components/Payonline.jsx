import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

const Payonline = (props) => {
  const [data, setData] = useState({});
  const [formError, setFormerror] = useState({});
  const { state } = useLocation();
  console.log(state);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const validation = () => {
    let err = {};
    let flag = false;

    if (data.month > 12 || data.month < 1) {
      err.month = "Please write a valid month";
      flag = true;
    }
    if (data.year > 2023 || data.year < 1947) {
      err.year = "Please write a valid year";
      flag = true;
    }
    if (data.amount < 100) {
      err.amount = "Amount cannot be less than 100";
    }
    setFormerror(err);
    console.log(formError);
    return flag;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      const formData = new FormData();
      formData.append("id", state._id);

      formData.append("month", data.month);
      formData.append("year", data.year);
      formData.append("amount", data.amount);
      await registerPayment(formData);
      navigate("/devoteesPage", { state: state });
    }
  };

  const registerPayment = async (formData) => {
    const res = await axios.post("http://localhost:9000/payment", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li
                className="nav-item text-white mx-2"
                style={{ cursor: "pointer" }}
              >
                Pay online
              </li>
              <li
                className="nav-item text-white mx-2"
                style={{ cursor: "pointer" }}
              >
                Profile
              </li>
            </ul>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={navigateHome}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
      <div className="m-5">
        <form onSubmit={handleSubmit}>
          <div className="m-2">
            <lable className="px-3">Month:</lable>
            <input
              type="number"
              name="month"
              onChange={handleChange}
              required
            />
            {formError.month && (
              <div className="error ms-4">{formError.month}</div>
            )}
          </div>
          <div className="m-2">
            <lable className="px-3">Year:</lable>
            <input
              type="number"
              className="ms-4"
              name="year"
              onChange={handleChange}
              required
            />
            {formError.year && (
              <div className="error ms-4">{formError.year}</div>
            )}
          </div>
          <div className="m-2">
            <lable className="px-3">Amount:</lable>
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              required
            />
            {formError.amount && (
              <div className="error ms-4">{formError.amount}</div>
            )}
          </div>
          <div className="m-5">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Payonline;
