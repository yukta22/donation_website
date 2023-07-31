import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Devotees = (props) => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [post, setPost] = React.useState(null);

  const navigateHome = () => {
    navigate("/");
  };

  const payonline = () => {
    navigate("/payonline", { state: state });
  };
  useEffect(() => {
    axios.get("http://localhost:9000/getPayment").then((response) => {
      setPost(response.data);
    });
  }, []);

  const filterData = post?.filter((e) => e.user[0]?.email == state.email);
  // console.log(filterData);

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
                onClick={payonline}
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
      <div>
        <table border="1" style={{ margin: "150px" }}>
          <thead>
            <th className="tabledata">month</th>
            <th className="tabledata">year</th>
            <th className="tabledata">amount</th>
          </thead>
          <tbody>
            {filterData?.map((ele, ind) => {
              return (
                <tr>
                  <td className="tabledata">{ele.month}</td>
                  <td className="tabledata">{ele.year}</td>
                  <td
                    className="tabledata"
                    style={{
                      color: `${ele.amount >= "10000" ? "green" : "black"} `,
                    }}
                  >
                    {ele.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Devotees;
