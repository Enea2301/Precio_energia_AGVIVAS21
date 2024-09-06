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

function renderGraph(data) {
    const labels = data.map(row => row['Año-Mes']);
    const precioOMIE = data.map(row => parseFloat(row['Precio OMIE']) || 0);
    const costeEstimado = data.map(row => parseFloat(row['Coste estimado (€)']) || 0);
    const costeEstimadoConIVA = data.map(row => parseFloat(row['Coste estimado con IVA (€)']) || 0);

    const ctx = document.getElementById('energyGraph').getContext('2d');
    const energyGraph = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Coste estimado con IVA (€)',
                    data: costeEstimadoConIVA,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    stack: 'Stack 0'
                },
                {
                    label: 'Coste estimado (€)',
                    data: costeEstimado,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    stack: 'Stack 1'
                },
                {
                    label: 'Precio OMIE (€)',
                    data: precioOMIE,
                    type: 'line',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y2'
                }
            ]
        },
        options: {
            scales: {
                y1: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Coste estimado (€)'
                    }
                },
                y2: {
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        beginAtZero: true
                    },
                    title: {
                        display: true,
                        text: 'Precio OMIE (€)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}
