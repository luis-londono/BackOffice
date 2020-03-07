import React, { useState, useEffect } from "react";
import * as userApi from "./api/userApi";
import { useHistory, useRouteMatch } from "react-router-dom";
import Input from "./shared/Input";

// Pulling outside of component since this never changes.
const emptyUser = {
  id: "",
  name: "",
  role: ""
};

const STATUS = {
  LOADING: "LOADING",
  SAVING: "SAVING",
  IDLE: "IDLE"
};

const ManageUser = ({ users, setUsers }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { id: userIdToEdit } = match.params;
  const inEditMode = Boolean(userIdToEdit);
  const [user, setUser] = useState(emptyUser);
  const [status, setStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    function getInitialUser(users) {
      if (userIdToEdit) {
        const userToEdit = users.find(
          user => user.id === parseInt(userIdToEdit)
        );
        setUser(userToEdit);
      }
    }

    async function initUser() {
      // if users aren't passed in, load 'em.
      if (users.length === 0) {
        try {
          setStatus(STATUS.LOADING);
          const usersResp = await userApi.getUsers();
          setUsers(usersResp.data);
          getInitialUser(usersResp.data);
        } catch (error) {
          console.error(error);
          throw error;
        } finally {
          setStatus(STATUS.IDLE);
        }
      } else {
        getInitialUser(users);
      }
    }

    initUser();
  }, [setUsers, userIdToEdit, users]);

  function onChange({ target }) {
    // Using computed property syntax to reference a property via a variable.
    setUser({ ...user, [target.id]: target.value });
  }

  async function saveUser(event) {
    event.preventDefault(); // don't post back.
    try {
      setStatus(STATUS.SAVING);
      const { data: savedUser } = await userApi.saveUser(user);

      if (inEditMode) {
        // Replace saved user using map
        setUsers(users.map(u => (u.id === savedUser.id ? savedUser : u)));
      } else {
        setUsers([...users, savedUser]);
      }
      // redirect to /users
      history.push("/users");
    } catch (error) {
      alert("Oops! Save failed. Please check your network and try again.");
      console.error(error);
      throw error;
    } finally {
      setStatus(STATUS.IDLE);
    }
  }

  if (status === STATUS.LOADING) return <h1>Loading... 🦄</h1>;

  return (
    <form onSubmit={saveUser}>
      <h1>{inEditMode ? "Edit" : "Add"} User</h1>
      <Input
        id="name"
        disabled={status === STATUS.SAVING}
        label="Name"
        value={user.name}
        onChange={onChange}
      />
      <Input
        id="role"
        disabled={status === STATUS.SAVING}
        label="Role"
        value={user.role}
        onChange={onChange}
      />
      <input
        type="submit"
        disabled={status === STATUS.SAVING}
        value={inEditMode ? "Save User" : "Add User"}
      />
    </form>
  );
};

export default ManageUser;
