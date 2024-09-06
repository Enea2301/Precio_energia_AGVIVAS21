document.addEventListener('DOMContentLoaded', function () {
    Papa.parse('Datos_energia.csv', {
        download: true,
        header: true,
        delimiter: ";",
        complete: function(results) {
            displayData(results.data);
        }
    });
});

function displayData(data) {
    const dataTable = document.getElementById('data-table');
    const table = document.createElement('table');
    
    // Create the header row
    const headerRow = document.createElement('tr');
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create the data rows
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    dataTable.appendChild(table);
} 


document.addEventListener('DOMContentLoaded', function () {
    fetch('Datos_energia.csv')
        .then(response => response.text())
        .then(csvText => {
            const data = Papa.parse(csvText, { header: true, delimiter: ";" }).data;

            const labels = data.map(row => row['Año-Mes']);
            const precioOMIE = data.map(row => parseFloat(row['Precio OMIE']) || 0);
            const costeEstimado = data.map(row => parseFloat(row['Coste estimado (€)']) || 0);

            const ctx = document.getElementById('energyGraph').getContext('2d');
            const energyGraph = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Coste estimado (€)',
                            data: costeEstimado,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            yAxisID: 'y1'
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
                            type: 'linear',
                            position: 'left',
                            ticks: {
                                beginAtZero: true
                            },
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
        });
});