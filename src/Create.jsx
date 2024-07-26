/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { toast } from "react-toastify";
//create var
// eslint-disable-next-line react/prop-types
function Create({ iD, setID, data, setData }) {
  const [values, setValues] = useState({
    id: Date.now(),
    name: "",
    email: "",
    phone: "",
  });
  //end create var

  const handleSubmit = (event) => {
    event.preventDefault();
    // if name or number is empty show toast empty
    if (values.name === "" || values.number === "") {
      toast.success("empty from");
    } else {
      // eslint-disable-next-line react/prop-types
      values.id = setID.iD + 1;

      // set new contact list
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
          setData([...data, json]);
        });
      toast.success("add succes");
    }
  };
  return (
    <div className="w-50 vh-50 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-3 pt-1 pb-3 rounded">
        <h1>Add a User</h1>
        {/* call habdleSubmit fun */}
        <form onSubmit={handleSubmit}>
          {/* get name,email,phone */}
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

export default Create;
