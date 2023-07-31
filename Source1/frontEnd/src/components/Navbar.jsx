import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  const navigeCreateUser = () => {
    navigate("/createUser");
  };

  const navigeDonation = () => {
    navigate("/donation");
  };

  return (
    <div>
      {" "}
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
                onClick={navigeCreateUser}
                style={{ cursor: "pointer" }}
              >
                User Create
              </li>
              <li
                className="nav-item text-white mx-2"
                onClick={navigeDonation}
                style={{ cursor: "pointer" }}
              >
                Donation
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
    </div>
  );
};

export default Navbar;
