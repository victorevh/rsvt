
const listElementNorte = document.getElementById("listaNorte");
const tableHeadNorte = document.getElementById("table-head-norte");

const listElementNordeste = document.getElementById("listaNordeste");
const tableHeadNordeste = document.getElementById("table-head-nordeste");

const listElementSul = document.getElementById("listaSul");
const tableHeadSul = document.getElementById("table-head-sul");

const listElementSudeste = document.getElementById("listaSudeste");
const tableHeadSudeste = document.getElementById("table-head-sudeste");

const doGet = (url) => {
    const promiseCallback = (resolve, reject) => {
        fetch(url)
            .then((response) => {
                if(!response.ok) throw new Error('Erro ao executar requisição, status' + response.status);

                return response.json();
})

        .then((data) => {
            localStorage.setItem('dados', JSON.stringify(data) );
            return data;
        })
        .then(resolve)
        .catch(reject);
}
    return new Promise(promiseCallback);
}

const usefulData = [ "Bacia", "Reservatorio", "ReservatorioPorcentagem", "ReservatorioValorUtil"];

const dataDictionary = {
    "Bacia": "Principais Bacias",
    "Reservatorio": "Principais Reservatórios",
    "ReservatorioPorcentagem": "% do Subsistema",
    "ReservatorioValorUtil": "Valor Útil Atual em %",
}


// TABELA NORTE

usefulData.forEach(dataName => {
    const tableColumn = document.createElement("td");
    tableColumn.innerHTML = dataDictionary[dataName];
    tableHeadNorte.appendChild(tableColumn);
});

const iterateResultNorte = (item) => {
    const tableRow = document.createElement("tr");

        usefulData.forEach(dataName => {
            const element = document.createElement("td");
            element.innerHTML = item[dataName];
            tableRow.appendChild(element);
        });

        listElementNorte.appendChild(tableRow);
}

// TABELA NORDESTE

usefulData.forEach(dataName => {
    const tableColumn = document.createElement("td");
    tableColumn.innerHTML = dataDictionary[dataName];
    tableHeadNordeste.appendChild(tableColumn);
});

const iterateResultNordeste = (item) => {
    const tableRow = document.createElement("tr");

        usefulData.forEach(dataName => {
            const element = document.createElement("td");
            element.innerHTML = item[dataName];
            tableRow.appendChild(element);
        });

        listElementNordeste.appendChild(tableRow);
        
}

// TABELA SUL

usefulData.forEach(dataName => {
    const tableColumn = document.createElement("td");
    tableColumn.innerHTML = dataDictionary[dataName];
    tableHeadSul.appendChild(tableColumn);
});

const iterateResultSul = (item) => {
    const tableRow = document.createElement("tr");

        usefulData.forEach(dataName => {
            const element = document.createElement("td");
            element.innerHTML = item[dataName];
            tableRow.appendChild(element);
        });

        listElementSul.appendChild(tableRow);
        
}

// TABELA SUDESTE / CENTRO- OESTE

usefulData.forEach(dataName => {
    const tableColumn = document.createElement("td");
    tableColumn.innerHTML = dataDictionary[dataName];
    tableHeadSudeste.appendChild(tableColumn);
});

const iterateResultSudeste = (item) => {
    const tableRow = document.createElement("tr");

        usefulData.forEach(dataName => {
            const element = document.createElement("td");
            element.innerHTML = item[dataName];
            tableRow.appendChild(element);
        });

        listElementSudeste.appendChild(tableRow);
        
}

// AGRUPANDO SUBSISTEMAS

const getSubSystems = result => {
    const subSystems = [];
        result.forEach(item => {
            const sub = item.Subsistema;
                if (!subSystems.includes(sub))
                subSystems.push(sub);
})

    return subSystems;
};

/**
 * Gerar uma nova base de acordo com o subsistema
 * @param {*} database base de dados completa
 * @param {*} subsystemName nome do subsistema
 */
const filterBaseBySubsystem = (database, subsystemName) => {
    // Database é um array de objetos
    // Cada objeto tem a propriedade subsistema
    let databaseBySubsystem = database.filter(item => {
        return item.Subsistema === subsystemName
    });

    return databaseBySubsystem;
}

const filterBaseByData = (database, dataInfo) => {
    let dataInfoAtt = database.filter(item => {
        return item.Data === dataInfo
    });
}

const onsRequestHandler = (result) => {
    // Rederizado resultado geral no HMTL
    // result.forEach(iterateResult)
    
    function titleData(){
        const titleData = document.getElementById("titleData");
        // Organizando titulo da data com slice
        const year = result[0].Data.slice(0,4);
        const mouth = result[0].Data.slice(5,7);
        const day = result[0].Data.slice(8,10);
        const titleItem = document.createElement("H1");
        titleItem.innerHTML = 'Dados atualizados em ' + day + '/' + mouth + '/' +  + year;
        titleData.appendChild(titleItem);
    }

    function EAR(){
        // Organizando EAR 3
        const getEAR3 = window.document.getElementById('EAR3');
        const EAR3 = result[19].SubsistemaValorUtil;
        const EAR3stringify = JSON.stringify(EAR3);
        const EAR3slice = EAR3stringify.slice(0,5);
        const titleEAR3 = document.createElement("h3");
        titleEAR3.innerHTML = 'EAR - Energia Armazenada Disponível ' + EAR3slice + '%';
        getEAR3.appendChild(titleEAR3);
    
        // Organizando EAR 2
        const getEAR2 = window.document.getElementById('EAR2');
        const EAR2 = result[7].SubsistemaValorUtil;
        const EAR2stringfy = JSON.stringify(EAR2);
        const EAR2slice = EAR2stringfy.slice(0,5);
        const titleEAR2 = document.createElement("h3");
        titleEAR2.innerHTML = 'EAR - Energia Armazenada Disponível ' + EAR2slice + '%';
        getEAR2.appendChild(titleEAR2);
    
        // Organizando EAR 1
        const getEAR1 = window.document.getElementById('EAR1');
        const EAR1 = result[3].SubsistemaValorUtil;
        const EAR1stringfy = JSON.stringify(EAR1);
        const EAR1slice = EAR1stringfy.slice(0,5);
        const titleEAR1 = document.createElement("h3");
        titleEAR1.innerHTML = 'EAR - Energia Armazenada Disponível ' + EAR1slice + '%';
        getEAR1.appendChild(titleEAR1);
    
        // Organizando EAR
        const getEAR = window.document.getElementById('EAR');
        const EAR = result[0].SubsistemaValorUtil;
        const EARstringfy = JSON.stringify(EAR);
        const EARslice = EARstringfy.slice(0,5);
        const titleEAR = document.createElement("h3");
        titleEAR.innerHTML = 'EAR - Energia Armazenada Disponível ' + EARslice + '%';
        getEAR.appendChild(titleEAR);
    }
    titleData();
    EAR();

    const norteDatabase = filterBaseBySubsystem(result, "Norte");
    const nordesteDatabase = filterBaseBySubsystem(result, "Nordeste");
    const sulDatabase = filterBaseBySubsystem(result, "Sul");
    const sudesteDatabase = filterBaseBySubsystem(result, "Sudeste / Centro-Oeste");

    norteDatabase.forEach(iterateResultNorte);
    nordesteDatabase.forEach(iterateResultNordeste);
    sulDatabase.forEach(iterateResultSul);
    sudesteDatabase.forEach(iterateResultSudeste);

    const subSistemas = getSubSystems(result).map(subSystem =>
    result.filter(item => item.Subsistema == subSystem))

}


function getCacheData() {
    
    var cache = localStorage.getItem('dados');
    
    return cache;
};

// Função de inicialização
function main() {
    //Verificar se os dados estão no cache

    const data = getCacheData();


    if(data){
        const today = new Date();
        const date = new Date((JSON.parse(data))[0].Data)
        const diffTime = Math.abs(date.getTime() - today.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
        if(diffDays < 1){
            onsRequestHandler(JSON.parse(data));
            return onsRequestHandler;
        }
    }
    
    doGet('http://tr.ons.org.br/Content/Get/SituacaoDosReservatorios')
    .then(onsRequestHandler)
    .catch(console.error);
    
}

main();
