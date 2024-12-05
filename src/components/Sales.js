import React, { useEffect, useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Chart, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/sales')
      .then((response) => response.json())
      .then((data) => {
        setSalesData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
        setLoading(false);
      });
  }, []);

  const totalSales = salesData.reduce((sum, sale) => sum + parseFloat(sale.total_price), 0);

  return (
    <div>
      <h1>Sales Overview</h1>
      {loading ? (
        <p>Loading sales data...</p>
      ) : (
        <>
          <div style={styles.summary}>
            <h3>Total Sales: ${totalSales.toFixed(2)}</h3>
          </div>
          <div style={styles.grid}>
            <h2>Sales Data</h2>
            <Grid data={salesData}>
              <GridColumn field="sale_id" title="ID" width="50px" />
              <GridColumn field="product_name" title="Product" />
              <GridColumn field="total_price" title="Amount" />
              <GridColumn field="sale_date" title="Date" />
            </Grid>
          </div>
          <div style={styles.chart}>
            <h2>Sales Trends</h2>
            <Chart>
              <ChartSeries>
                <ChartSeriesItem
                  type="line"
                  data={salesData.map((sale) => ({
                    category: sale.sale_date,
                    value: sale.total_price,
                  }))}
                  field="value"
                  categoryField="category"
                />
              </ChartSeries>
            </Chart>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  summary: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  grid: {
    marginBottom: '20px',
  },
  chart: {
    marginBottom: '20px',
  },
};

export default Sales;
