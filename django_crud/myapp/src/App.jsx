import React, { useState, useEffect } from 'react';
import { getCookie } from './csrf';
import DataTable from './components/DataTable';
import UpdateModal from './components/UpdateModal';
import './App.css';
import AddModal from './components/AddModal';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updateId, setUpdateId] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
      .then(response => {
        return response.json().then(result => {
          if (!response.ok) {
            throw new Error(result.error);
          }
          return result;
        });
      })
      .then(result => {
        updateMessage(result.message);
        updateErrorMessage('');
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        updateMessage('');
        updateErrorMessage(error.message);
      });
  };

  function updateMessage(message) {
    setMessage(message)
  };
  function updateErrorMessage(message) {
    setError(message)
  };

  function handleUpdateId(id) {
    setUpdateId(id);
  }

  return (
    <>
      <div className='data_block'>
        <DataTable data={data} handleDelete={handleDelete} handleUpdateId={handleUpdateId} />
      </div>
      <hr className='hrDivider' />
      <div className='pagination_block'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button className="btn btn-outline-secondary" key={i + 1} onClick={() => { setPage(i + 1) }} disabled={page === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
      <hr className='hrDivider' />
      <div className='successMessage'>{message}</div>
      <div className='errorMessage'>{error}</div>
      <div className='addBtn'>
        <button className="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdropAdd" >Add Item</button>
      </div>
      <div>
        <UpdateModal updateId={updateId} rowData={data.find(item => item.id === updateId)}
          loadPage={loadPage} updateMessage={updateMessage} updateErrorMessage={updateErrorMessage} />
        <AddModal loadPage={loadPage} updateMessage={updateMessage} updateErrorMessage={updateErrorMessage} />
      </div>
    </>
  );
}

export default App;
