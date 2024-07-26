/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Create from "./Create";
import Update from "./Update";

function Home() {
  // create var
  const [data, setData] = useState([]);
  const [iD, setID] = useState();
  const [idEdit, setIDEdit] = useState();
  //end creat var
  // use useEffect set all contact setData var
  useEffect(() => {
    const jsonData = fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, []);

  //Delete contact list
  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    });

    const newJsonData = data.filter((item) => item.id !== id);
    setData(newJsonData);
    toast.success("Delete Success");
  };
  //set id in setIDEdit var
  const handleEdit = (id) => {
    setIDEdit.idEdit = id;
    toast.success("Upate in the Update Box");
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light ">
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          {/*call Creat.jsx and Update.jsx */}
          <Create iD={iD} setID={setID} data={data} setData={setData} />
          <Update
            idEdit={idEdit}
            setIDEdit={setIDEdit}
            data={data}
            setData={setData}
          />
        </div>
        <h1 className="text-danger">Contact List of Users</h1>
        {/* Create Contact List Table */}
        <table className="table table-stiped">
          <thead className="table table-striped">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* map with contact list and show data or setId set id value */}
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{(setID.iD = d.id)}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>
                  {/* call habdleEdit fun */}
                  <button
                    onClick={(e) => handleEdit(d.id)}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Edit
                  </button>
                  {/* call habdleDelete fun */}
                  <button
                    onClick={(e) => handleDelete(d.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
