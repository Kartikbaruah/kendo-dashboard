import React, { useEffect, useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import '@progress/kendo-theme-default/dist/all.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newTask, setNewTask] = useState({ description: '', status: '', due_date: '' });

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then(() => {
        setTasks([...tasks, newTask]);
        setShowDialog(false);
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <button onClick={() => setShowDialog(true)}>Add Task</button>
      <Grid data={tasks}>
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="description" title="Description" />
        <GridColumn field="status" title="Status" />
        <GridColumn field="due_date" title="Due Date" />
      </Grid>

      {showDialog && (
        <Dialog onClose={() => setShowDialog(false)}>
          <h3>Add New Task</h3>
          <input
            type="text"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          />
          <input
            type="date"
            value={newTask.due_date}
            onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
          />
          <DialogActionsBar>
            <button onClick={addTask}>Add</button>
            <button onClick={() => setShowDialog(false)}>Cancel</button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default Tasks;
