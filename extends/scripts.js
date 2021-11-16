// Chart
var ctx = document.getElementsByClassName("line-chart");


// Type, Data e options
var chartGraph = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Furnas", "Paraibuna", "Ilha Solteira", "Itumbiara", "Capivara", "Três Marias", "Henry Borden", "Serra da Mesa"],
        datasets: [{
            label: "Volume medio útil de cada Hidrelétrica em %", 
            data: [15.55, 17.02, 10.12, 9.74, 37.26, 34.40, 38.02, 22.57],
            borderWidth: 5,
            borderColor: 'rgba(77,166,254,0.85)',
            
        },
        {
            label: "Volume medio útil de cada Hidrelétrica em %", 
            data: [15.55, 17.02, 10.12, 9.74, 37.26, 34.40, 38.02, 22.57],
            borderWidth: 5,
            borderColor: 'rgba(77,166,254,0.85)',
            
        }]
    },
});
