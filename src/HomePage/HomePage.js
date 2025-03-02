import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import { Chart as ChartJS } from 'chart.js/auto';

function HomePage() {
    const [budgetData, setBudgetData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/budget');
                setBudgetData(response.data.myBudget);
                createCharts(response.data.myBudget);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };
        fetchData();
    }, []);

    const createCharts = (data) => {
        // Create D3.js chart
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        d3.select('#d3Chart').selectAll('*').remove();
        const svg = d3.select('#d3Chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const pie = d3.pie().value(d => d.budget);
        const arc = d3.arc().innerRadius(100).outerRadius(radius);

        const arcs = svg.selectAll('arc')
            .data(pie(data))
            .enter()
            .append('g');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i));

        // Add labels
        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .text(d => d.data.title);

        // Create Chart.js chart
        const ctx = document.getElementById('myChart');
        if (ctx) {
            const existingChart = ChartJS.getChart(ctx);
            if (existingChart) {
                existingChart.destroy();
            }

            new ChartJS(ctx, {
                type: 'pie',
                data: {
                    labels: data.map(item => item.title),
                    datasets: [{
                        data: data.map(item => item.budget),
                        backgroundColor: data.map((_, index) => color(index))
                    }]
                }
            });
        }
    };

    return (
        <div className="container center">

            <div className="page-area">
                {/* This is an A11y Change - Background color */}
                <div className="text-box" style={{ backgroundColor: "aqua" }}>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </div>

                {/* This is an A11y Change - Background color */}
                <div className="text-box" style={{ backgroundColor: "aqua" }}>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </div>

                {/* This is an A11y Change - Background color */}
                <div className="text-box" style={{ backgroundColor: "cornsilk" }}>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they live happier lives... since they spend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </div>

                {/* This is an A11y Change - Background color */}
                <div className="text-box" style={{ backgroundColor: "cornsilk" }}>
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </div>

                {/* This is an A11y Change - Background color */}
                <div className="text-box" style={{ backgroundColor: "aqua" }}>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </div>

                {/* This is an A11y Change - Background color */}
                <div className="text-box" style={{ backgroundColor: "aqua" }}>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </div>

                {/* D3JS Chart */}
                <div className="text-box">
                    <h1>D3JS Chart</h1>
                    <div id="d3Chart"></div>
                </div>

                {/* Chart.js Canvas */}
                <div className="text-box">
                    <h1>Chart.js Chart</h1>
                    <div>
                        <canvas id="myChart" width="400" height="400"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;