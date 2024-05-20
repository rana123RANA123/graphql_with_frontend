import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GET_USERS } from "../graphql/queries/transaction.query";
import {
  CREATE_USER,
  DELETE_USER,
} from "../graphql/mutations/transcation.mutation";

const Users = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER, {
    update(cache, { data: { createUser } }) {
      const { getUsers } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: { getUsers: [...getUsers, createUser] },
      });
    },
  });
  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const { getUsers } = cache.readQuery({ query: GET_USERS });
      cache.writeQuery({
        query: GET_USERS,
        data: {
          getUsers: getUsers.filter((user) => user.id !== deleteUser.id),
        },
      });
    },
  });

  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    phoneNumber: "",
    cnic: "",
    houseNumber: "",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      await createUser({ variables: { userInput } });
      setUserInput({
        firstName: "",
        lastName: "",
        fatherName: "",
        phoneNumber: "",
        cnic: "",
        houseNumber: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUser();
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser({ variables: { ID: id } });
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="users-container">
      <h1 style={{ textAlign: "center" }}>Users</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={userInput.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={userInput.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Father Name:</label>
          <input
            type="text"
            name="fatherName"
            value={userInput.fatherName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={userInput.phoneNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>CNIC:</label>
          <input
            type="text"
            name="cnic"
            value={userInput.cnic}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>House Number:</label>
          <input
            type="text"
            name="houseNumber"
            value={userInput.houseNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
      <table className="user-table">
        <thead>
          <tr>
            <th>I</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Father Name</th>
            <th>Phone Number</th>
            <th>CNIC</th>
            <th>House Number</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.getUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.fatherName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.cnic}</td>
              <td>{user.houseNumber}</td>
              <td>{user.createdAt}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditUser(user.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
