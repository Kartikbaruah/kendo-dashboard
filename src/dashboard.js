import React, { useState } from 'react';
import Metrics from './components/Metrics';
import Tasks from './components/Tasks';
import Logs from './components/Logs';
import Sales from './components/Sales';
import Users from './components/Users';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('metrics');

  const renderSection = () => {
    switch (activeSection) {
      case 'metrics':
        return <Metrics />;
      case 'tasks':
        return <Tasks />;
      case 'logs':
        return <Logs />;
      case 'sales':
        return <Sales />;
      case 'users':
        return <Users />;
      default:
        return <Metrics />;
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <nav>
        <button onClick={() => setActiveSection('metrics')}>Metrics</button>
        <button onClick={() => setActiveSection('tasks')}>Tasks</button>
        <button onClick={() => setActiveSection('logs')}>Logs</button>
        <button onClick={() => setActiveSection('sales')}>Sales</button>
        <button onClick={() => setActiveSection('users')}>Users</button>
      </nav>
      <div className="section-content">{renderSection()}</div>
    </div>
  );
};

export default Dashboard;
