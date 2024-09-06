document.addEventListener('DOMContentLoaded', function () {
    Papa.parse('Datos_energia.csv', {
        download: true,
        header: true,
        delimiter: ";",
        complete: function(results) {
            createChart(results.data);
        }
    });
});

function createChart(data) {
    const labels = [];
    const prices = [];

    data.forEach(row => {
        if (row['Precio OMIE']) { // Filter out rows with NaN prices
            labels.push(row['Year-Month']);
            prices.push(parseFloat(row['Precio OMIE'].replace(',', '.')));
        }
    });

    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Precio OMIE (€)',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month-Year'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (€)'
                    }
                }
            }
        }
    });
} 
