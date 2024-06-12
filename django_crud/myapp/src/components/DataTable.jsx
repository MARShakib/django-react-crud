import React from 'react';

const DataTable = ({ data, handleDelete, handleUpdateId }) => {
    const keys = []
    for (var key in data[0]) {
        keys.push(key)
    }
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    {keys.map(key => (
                        <th>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {keys.map(key => (
                            <td key={key}>{item[key]}</td>
                        ))}
                        <td>
                            <button className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                        <td>
                            <button onClick={() => handleUpdateId(item.id)} className="btn btn-outline-info"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Update</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;
