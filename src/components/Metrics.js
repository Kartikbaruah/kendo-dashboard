import React, { useEffect, useState } from 'react';
import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartTooltip,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';

const Metrics = () => {
  const [metricsData, setMetricsData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/metrics')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch metrics data');
        }
        return response.json();
      })
      .then((data) => {
        setMetricsData(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching metrics:', error);
        setError(error.message);
      });
  }, []);

  const filteredData =
    filter === 'All'
      ? metricsData
      : metricsData.filter((metric) => metric.category === filter);

  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.title, color: 'black' }}>Metrics</h1>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.filterContainer}>
        <label htmlFor="filter">Filter by Category:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.dropdown}
        >
          <option value="All">All</option>
          <option value="Revenue">Revenue</option>
          <option value="Users">Users</option>
          <option value="Tasks">Tasks</option>
        </select>
      </div>

      {filteredData.length > 0 ? (
        <Chart style={styles.chart}>
          <ChartTitle text="Metrics Overview" />
          <ChartLegend position="top" visible />
          <ChartTooltip />
          <ChartCategoryAxis>
            <ChartCategoryAxisItem
              categories={filteredData.map((metric) => metric.metric_name)}
              title={{ text: 'Metrics Categories' }}
            />
          </ChartCategoryAxis>
          <ChartSeries>
            <ChartSeriesItem
              type="column"
              data={filteredData.map((metric) => metric.metric_value)}
              name="Values"
              labels={{
                visible: true,
                format: "{0}",
                content: (point) => `${point.value}`,
              }}
            />
            <ChartSeriesItem
              type="line"
              data={filteredData.map((metric) => metric.metric_value)}
              name="Trend"
              markers={{ visible: true, size: 5 }}
              style="smooth"
            />
          </ChartSeries>
        </Chart>
      ) : (
        <p style={styles.noData}>No metrics found for the selected category.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  filterContainer: {
    marginBottom: '20px',
  },
  dropdown: {
    marginLeft: '10px',
    padding: '5px',
    fontSize: '16px',
  },
  chart: {
    margin: '0 auto',
    maxWidth: '95%',
    height: '500px',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
  noData: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#666',
  },
};

export default Metrics;
