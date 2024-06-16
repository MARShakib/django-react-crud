import React, { useState, useEffect } from 'react';

function ChartComponent() {
    const [chartData, setChartData] = useState('');

    useEffect(() => {
        fetch('/generate_chart')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch chart data');
                }
                return response.json();
            })
            .then(data => {
                setChartData(data.chart_data);
            })
            .catch(error => {
                console.error('Error fetching chart data:', error);
            });
    }, []);

    return (
        <div>
            {chartData && <img src={`data:image/png;base64,${chartData}`} alt="Chart" />}
        </div>
    );
}

export default ChartComponent;
