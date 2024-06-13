import { useState, useEffect } from "react";
import React from "react";
import { getCookie } from "../csrf";

const UpdateModal = ({ updateId, rowData = {}, loadPage }) => {
    const [formData, setFormData] = useState({
        date: '',
        trade_code: '',
        high: '',
        low: '',
        open: '',
        close: '',
        volume: '',
    });

    useEffect(() => {
        if (rowData) {
            setFormData({
                date: rowData.date || ' ',
                trade_code: rowData.trade_code || ' ',
                high: rowData.high || ' ',
                low: rowData.low || ' ',
                open: rowData.open || ' ',
                close: rowData.close || ' ',
                volume: rowData.volume || ' ',
            });
        }
    }, [rowData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/update_data/${updateId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify(formData),
        })
        loadPage()
    };
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Update Id: {updateId}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="col-auto">
                                <div className="input-group">
                                    <span className="input-group-text">Date</span>
                                    <input type="text" className="form-control" value={formData.date} name='date' onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Trade_code</span>
                                    <input type="text" className="form-control" value={formData.trade_code} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">High</span>
                                    <input type="text" className="form-control" value={formData.high} name='high' onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Low</span>
                                    <input type="text" className="form-control" value={formData.low} name='low' onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Open</span>
                                    <input type="text" className="form-control" value={formData.open} name='open' onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Close</span>
                                    <input type="text" className="form-control" value={formData.close} name='close' onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Volume</span>
                                    <input type="text" className="form-control" value={formData.volume} name='volume' onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateModal;