import React, { useEffect } from "react";
import * as userApi from "./api/userApi";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";

function Users({ users, setUsers }) {
  const history = useHistory();

  useEffect(() => {
    async function initUsers() {
      // if users aren't passed in, load 'em.
      if (users.length === 0) {
        const usersResp = await userApi.getUsers();
        setUsers(usersResp.data);
      }
    }
    initUsers();
  }, [setUsers, users.length]);

  async function deleteUser(id) {
    await userApi.deleteUser(id);
    // Alternatively, we could getUsers and then store that in state.
    // But to avoid an extra HTTP call, we'll just remove the deleted
    // record from state.
    const newUsers = users.filter(user => user.id !== id);
    setUsers(newUsers);
  }

  return (
    <>
      <h1>Users</h1>
      <button onClick={() => history.push("/user")}>Add User</button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <button
                  aria-label={`Delete ${user.name} with ID of ${user.id}`}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
              <td>{user.id}</td>
              <td>
                <Link to={"/user/" + user.id}>{user.name}</Link>
              </td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired
};

export default Users;
