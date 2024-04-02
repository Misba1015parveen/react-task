// PopulationGraph.js

import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const PopulationGraph = () => {
    const [populationData, setPopulationData] = useState([]);
    const chartRef = useRef(null); // Ref to store the Chart instance

    useEffect(() => {
        // Fetch population data from the API
        fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
            .then(response => response.json())
            .then(data => {
                // Extract population data for different nations
                const populationByNation = data.data.map(entry => ({
                    label: `${entry.Nation} (${entry.Year})`, // Include year to make labels unique
                    population: entry.Population,
                }));
                setPopulationData(populationByNation);
            })
            .catch(error => console.error('Error fetching population data:', error));
    }, []);

    useEffect(() => {
        // Create or update the chart when population data changes
        if (populationData.length > 0 && chartRef.current) {
            // Destroy existing chart instance if it exists
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartRef.current.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: populationData.map(entry => entry.label),
                    datasets: [{
                        label: 'Population',
                        data: populationData.map(entry => entry.population),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Population by Nation',
                            font: {
                                size: 16
                            }
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Population',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Nation',
                            },
                        },
                    },
                },
            });
        }
    }, [populationData]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Population Graph for different Nations</h1>
            <div style={{ paddingTop: '20px' }}>
                <canvas ref={chartRef} id="population-chart" width="1100" height="400"></canvas>
            </div>
        </div>
    );
};

export default PopulationGraph;
