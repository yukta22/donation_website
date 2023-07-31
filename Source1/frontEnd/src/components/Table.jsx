import React from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ data }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/createUser", { state: data });
  };

  const handleDelete = () => {};

  return (
    <tr style={{ border: "1px solid black" }}>
      <td className="tabledata">
        {data.firstName} {data.middleName} {data.lastName}
      </td>
      <td className="tabledata">{data.city}</td>
      <td className="tabledata">{data.state}</td>
      <td className="tabledata">{data.pincode}</td>
      <td className="tabledata">{data.email}</td>
      <td className="tabledata">{data.date}</td>
      <td className="tabledata">
        <button type="button" className="btn btn-primary" onClick={handleEdit}>
          Edit
        </button>
      </td>
      <td className="tabledata">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Table;
