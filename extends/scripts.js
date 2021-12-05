/* Chart
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
*/



//JSON
/*
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
*/

const listElement = document.getElementById("lista");
const tableHead = document.getElementById("table-head");

const doGet = (url) => {
    const promiseCallback = (resolve, reject) => {
        fetch(url)
            .then((response) => {
                if(!response.ok) throw new Error('Erro ao executar requisição, status' + response.status);
                return response.json();
})

        .then(resolve)
        .catch(reject);
}
    return new Promise(promiseCallback);
}

const usefulData = [ "Bacia", "Reservatorio", "ReservatorioValorUtil" ];


usefulData.forEach(dataName => {
    const tableColumn = document.createElement("td");
    tableColumn.innerHTML = dataName;
    tableHead.appendChild(tableColumn);
});

const iterateResult = (item) => {
    const tableRow = document.createElement("tr");

usefulData.forEach(dataName => {
    const element = document.createElement("td");
    element.innerHTML = item[dataName];
    tableRow.appendChild(element);
});

listElement.appendChild(tableRow);
}

const getSubSystems = result => {
    const subSystems = [];
        result.forEach(item => {
            const sub = item.Subsistema;
                if (!subSystems.includes(sub))
                subSystems.push(sub);
})

    return subSystems;
};

doGet('http://tr.ons.org.br/Content/Get/SituacaoDosReservatorios').then(result => {
result.forEach(iterateResult)
    console.log(result[0]);

    const subSistemas = getSubSystems(result).map(subSystem =>
    result.filter(item => item.Subsistema == subSystem)
)

    console.log(subSistemas);

    const subSistNorte = subSistemas[0]
    const subSistNordeste = subSistemas[1]
    const subSistSul = subSistemas[2]
    const subSistSudeste = subSistemas[3]
    
    console.log(subSistNorte)
    console.log(subSistNordeste)
    console.log(subSistSul)
    console.log(subSistSudeste)
    
    
}).catch(console.error);