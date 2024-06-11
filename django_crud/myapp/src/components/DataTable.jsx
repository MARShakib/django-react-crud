import React from 'react';

const DataTable = ({ data }) => {
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;
