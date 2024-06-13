import React, { useState, useEffect } from 'react';
import { getCookie } from './csrf';
import DataTable from './components/DataTable';
import UpdateModal from './components/UpdateModal';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updateId, setUpdateId] = useState(0);

  const loadPage = () => {
    fetch(`/get_data?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setData(data.data);
        setTotalPages(data.total_pages);
      });
  }

  useEffect(() => {
    loadPage()
  }, [page]);

  const handleDelete = (id) => {
    fetch(`/delete_data/${id}`, {
      method: 'DELETE',
      headers: { 'X-CSRFToken': getCookie('csrftoken') }
    })
      .then(() => setData(data.filter(item => item.id !== id)));
  };

  const handleUpdateId = (id) => {
    setUpdateId(id)
  };

  const handleUpdate = () => {
    fetch(`/update_data/${updateId}`, {
      method: 'PUT',
      headers: { 'X-CSRFToken': getCookie('csrftoken') }
    })
    // .then(() => setData(data.filter(item => item.id !== id)));
  };

  return (
    <>
      <div className='data_block'>
        <DataTable data={data} handleDelete={handleDelete} handleUpdateId={handleUpdateId} />
      </div>
      <hr />
      <div className='pagination_block'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button className="btn btn-outline-secondary" key={i + 1} onClick={() => { setPage(i + 1) }} disabled={page === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
      <div>
        <UpdateModal updateId={updateId} rowData={data.find(item => item.id === updateId)} loadPage={loadPage} />
      </div>
    </>
  );
}

export default App;
