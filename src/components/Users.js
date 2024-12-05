import React, { useEffect, useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import '@progress/kendo-theme-default/dist/all.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const addUser = () => {
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers([...users, data]);
        setShowDialog(false);
      })
      .catch((error) => console.error('Error adding user:', error));
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error('Error deleting user:', error));
  };

  const updateUser = () => {
    fetch(`http://localhost:5000/users/${selectedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedUser),
    })
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        );
        setUsers(updatedUsers);
        setShowDialog(false);
      })
      .catch((error) => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <button onClick={() => setShowDialog('add')}>Add User</button>
      <Grid
        data={users}
        onRowClick={(e) => {
          setSelectedUser(e.dataItem);
          setShowDialog('edit');
        }}
      >
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="name" title="Name" />
        <GridColumn field="email" title="Email" />
        <GridColumn field="role" title="Role" />
        <GridColumn
          title="Actions"
          cell={(props) => (
            <td>
              <button onClick={() => deleteUser(props.dataItem.id)}>Delete</button>
            </td>
          )}
        />
      </Grid>

      {showDialog === 'add' && (
        <Dialog onClose={() => setShowDialog(false)}>
          <h3>Add New User</h3>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
          <DialogActionsBar>
            <button onClick={addUser}>Add</button>
            <button onClick={() => setShowDialog(false)}>Cancel</button>
          </DialogActionsBar>
        </Dialog>
      )}

      {showDialog === 'edit' && (
        <Dialog onClose={() => setShowDialog(false)}>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Role"
            value={selectedUser.role}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
            }
          />
          <DialogActionsBar>
            <button onClick={updateUser}>Save</button>
            <button onClick={() => setShowDialog(false)}>Cancel</button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default Users;
