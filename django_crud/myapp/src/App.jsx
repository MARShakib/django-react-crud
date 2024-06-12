import React, { useState, useEffect, useRef } from 'react';
import { getCookie } from './csrf';
import DataTable from './components/DataTable';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updateId, setUpdateId] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch(`/get_data?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setData(data.data);
        setTotalPages(data.total_pages);
      });
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

  const handleUpdate = (id) => {
    fetch(`/update_data/${id}`, {
      method: 'PUT',
      headers: { 'X-CSRFToken': getCookie('csrftoken') }
    })
    // .then(() => setData(data.filter(item => item.id !== id)));


    // close the modal
    const modalElement = modalRef.current;
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    console.log(modalElement)

  };

  return (
    <>
      <div className='data_block'>
        <DataTable data={data} handleDelete={handleDelete} handleUpdateId={handleUpdateId} />
      </div>
      <hr />
      <div className='pagination_block'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => setPage(i + 1)} disabled={page === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
      {/* Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Id: { }</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => handleUpdate(updateId)}>Understood</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
