import React, { useEffect, useState } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const userToken = localStorage.getItem('token'); // Retrieve the token from local storage
        if (!userToken) {
          throw new Error('No token found'); // Handle the case where the token is not available
        }
    
        const response = await fetch('http://localhost:4000/getReports', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        setReports(data); // Set the fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if reports is not an array or is empty
  if (!Array.isArray(reports) || reports.length === 0) {
    return <div>No reports available.</div>;
  }

  return (
    <div>
      <h1>User Weather Reports</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>City</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Wind Speed</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{report.city}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{report.windSpeed}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{report.temperature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;