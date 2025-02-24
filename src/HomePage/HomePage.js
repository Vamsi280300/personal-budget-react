import React, { useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';

// Data structure for Chart.js
var dataSource = {
    datasets: [{
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#FF5733',
            '#28C13E',
            '#283EA6'
        ]
    }],
    labels: []
};

// Function to create Chart.js pie chart
function createChart() {
    var canvas = document.getElementById('myChart');

    if (!canvas) {
        console.error("Canvas element for Chart.js not found!");
        return;
    }

    var ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Failed to get 2D context for Chart.js");
        return;
    }

    new Chart(ctx, {
        type: 'pie',
        data: dataSource
    });

    console.log("Chart.js initialized successfully!");
}

// Function to create D3.js chart
function createD3Chart(budgetData) {
    console.log("Creating D3 Chart with Data:", budgetData);

    var chartContainer = d3.select("#d3Graph");

    if (chartContainer.empty()) {
        console.error("D3 container not found!");
        return;
    }

    chartContainer.selectAll("*").remove(); // Clear previous charts

    var width = 600, height = 400;
    var svg = chartContainer.append("svg")
        .attr("width", width)
        .attr("height", height);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    var pie = d3.pie().value(d => d.budget);
    var arc = d3.arc().innerRadius(50).outerRadius(150);

    var arcs = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`)
        .selectAll("path")
        .data(pie(budgetData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => colorScale(d.data.title));

    console.log("D3.js chart initialized successfully!");
}

// Function to fetch budget data using Axios
function getBudget() {
  //  axios.get('http://localhost:3000/Readdata')//
  axios.get('/Readdata.json')
        .then(function (res) {
            console.log("API Response:", res.data);

            if (res.data && res.data.myBudget) {
                console.log("Budget Data:", res.data.myBudget);

                for (var i = 0; i < res.data.myBudget.length; i++) {
                    dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                    dataSource.labels[i] = res.data.myBudget[i].title;
                }

                createChart();  // Initialize Chart.js pie chart
                createD3Chart(res.data.myBudget); // Initialize D3.js chart
            } else {
                console.error("Invalid or null response data:", res.data);
            }
        })
        .catch(function (error) {
            console.error("Error fetching budget data:", error);
        });
}

function HomePage() {
  
    useEffect(() => {
        getBudget();
    }, []);

    return (
        <main className="center" id="main">
            <section className="page-area">
                <article>
                    <h2>Stay on Track</h2>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>

                <article>
                    <h2>Alerts</h2>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>

                <article>
                    <h2>Results</h2>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they spend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </article>

                <article>
                    <h2>Free</h2>
                    <p>
                        This app is free! And you are the only one holding your data!
                    </p>
                </article>

                <section>
                    <h2>Chart</h2>
                    <canvas id="myChart" width="700" height="400"></canvas>
                </section>

                <section>
                    <h2>Budget Allocation (D3.js Graph)</h2>
                    <div id="d3Graph"></div>
                </section>
            </section>
        </main>
    );
}

export default HomePage;
