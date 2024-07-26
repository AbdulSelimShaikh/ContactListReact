/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Update({ idEdit, setIDEdit, data, setData }) {
  //create all var
  // const [data, setData] = useState([]);
  const [values, setValues] = useState({
    id: Date.now(),
    name: "",
    email: "",
    phone: "",
  });
  //end all var

  const handleSubmit = (event) => {
    event.preventDefault();
    // if name or number is empty show toast empty
    if (values.name === "" || values.number === "") {
      toast.success("empty from");
    } else {
      // eslint-disable-next-line react/prop-types
      values.id = setIDEdit.idEdit;
      // finde values.id=data.id and edit data contact list
      const updateContact = data.map((contact) => {
        if (contact.id === values.id) {
          contact = values;
        }
        return contact;
      });
      setData(updateContact);
      // edit contact with json
      fetch("https://jsonplaceholder.typicode.com/posts/" + values.id, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        });
      toast.success("Update success");
    }
  };
  return (
    <div className=" w-50 vh-50 justify-content-end align-items-end bg-light">
      <div className="w-50 border bg-white shadow px-3 pt-1 pb-3 rounded">
        <h1>Update a User</h1>
        {/* call habdleSubmit fun fun */}
        <form onSubmit={handleSubmit}>
          {/* get name,email,phone values */}
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="from-control"
              placeholder="Enter Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              className="from-control"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              className="from-control"
              placeholder="Enter Phone"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <button className="btn btn-warning">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
