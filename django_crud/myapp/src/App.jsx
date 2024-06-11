import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/get_data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  return (
    <>
      <div className='test'>
        <DataTable data={data} />
      </div>
    </>
  );
}

export default App;
