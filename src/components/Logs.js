import React, { useEffect, useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/logs')
      .then((response) => response.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching logs:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>User Activity Logs</h1>
      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p>No logs available</p>
      ) : (
        <div style={styles.logContainer}>
          {logs.map((log) => (
            <div key={log.log_id} style={styles.logItem}>
              <p><strong>Action:</strong> {log.action}</p>
              <p><strong>User ID:</strong> {log.user_id}</p> {/* Updated from log.user */}
              <p><strong>Timestamp:</strong> {new Date(log.log_date).toLocaleString()}</p> {/* Updated from log.timestamp */}
              <p><strong>Description:</strong> {log.description}</p> {/* Added description */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  logContainer: {
    maxHeight: '400px',
    overflowY: 'scroll',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
  logItem: {
    marginBottom: '15px',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default Logs;
