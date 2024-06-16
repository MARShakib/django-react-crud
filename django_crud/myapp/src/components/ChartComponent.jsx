import React from 'react';

function ChartComponent({ chartData }) {
    return (
        <div>
            {chartData ? <img src={`data:image/png;base64,${chartData}`} alt="Chart" /> : <p>Click the button to load the chart</p>}
        </div>
    );
}

export default ChartComponent;
