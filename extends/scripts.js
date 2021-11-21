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
            
        }]
    },
});



//JSON

const header = document.querySelector('.subSist');
const section = document.querySelector('.infos');

var requestURL = 'https://raw.githubusercontent.com/victorevh/rsvt/main/data.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'text';
request.send();

request.onload = function(){
    var dataInfoText = request.response;
    var dataInfo = JSON.parse(dataInfoText);
    showSubsystem(dataInfo);
    showRsvtInfo(dataInfo);
}

function showSubsystem(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = 'Hidréletricas do Subsistema ' + jsonObj['subsistema'];
    header.appendChild(myH1);

    var myPara = document.createElement('h3');
    myPara.textContent = 'EAR: ' + jsonObj['EAR'] + ' (Energia Armazenada)';
    header.appendChild(myPara);
}

function showRsvtInfo(jsonObj) {
    var hidreletricas = jsonObj['hidreletricas'];

    for (var i = 0; i < hidreletricas.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myList = document.createElement('ul');

        myH2.textContent = hidreletricas[i].rsvtname;
        myPara1.textContent = 'Volume útil: ' + hidreletricas[i].nivelPercent + '%';
        myPara2.textContent = 'Localidade: ' + hidreletricas[i].cidade;
        myPara3.textContent = 'Reservatórios:';

        var reservatorios = hidreletricas[i].reservatorios;
        for (var j = 0; j < reservatorios.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = reservatorios[j];
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}