import React from 'react';


function HomePage() {
  return (
    <main class="center" id="main">
    <section class="page-area"> 
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
            <p>
                <canvas id="myChart" width="700" height="400" aria-label="Budget chart" role="img"></canvas> 
            </p>
        </section>
        <section>
            <h2>Budget Allocation (D3.js Graph)</h2>
            <svg id="d3Graph" width="600" height="400"></svg>
        </section>
        
    </section>
</main>
  );
}

export default HomePage;
