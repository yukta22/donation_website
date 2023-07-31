import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import Navbar from "./Navbar";

const Admin = () => {
  const [post, setPost] = useState();
  const [pageNo, setPageNo] = useState(1);
  const token = localStorage.getItem("token");
  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:9000/getUser",
      headers: {
        pageNo: pageNo,
        // headers: { token },
      },
    };

    axios(config)
      .then(function (response) {
        setPost(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [pageNo]);

  const prevPage = () => {
    if (pageNo <= 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };
  const nextPage = () => {
    if (post?.length > 1) {
      setPageNo(pageNo + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex flex-col justify-content-center">
        <table border="1" style={{ margin: "80px" }}>
          <thead>
            <th className="tabledata">Full Name</th>
            <th className="tabledata">City</th>
            <th className="tabledata">State</th>
            <th className="tabledata">pincode</th>
            <th className="tabledata">Email Id</th>
            <th className="tabledata">Initiation Date</th>
            <th className="tabledata">Update</th>
            <th className="tabledata">Delete</th>
          </thead>
          <tbody>
            {post?.map((ele, ind) => {
              return <Table data={ele} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={prevPage}
        >
          Prev
        </button>
        <div className="m-2 my-3">{pageNo}</div>
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Admin;
