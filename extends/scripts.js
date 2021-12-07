const listElementNorte = document.getElementById("listaNorte");
const tableHeadNorte = document.getElementById("table-head-norte");

const listElementNordeste = document.getElementById("listaNordeste");
const tableHeadNordeste = document.getElementById("table-head-nordeste");

const listElementSul = document.getElementById("listaSul");
const tableHeadSul = document.getElementById("table-head-sul");

const listElementSudeste = document.getElementById("listaSudeste");
const tableHeadSudeste = document.getElementById("table-head-sudeste");

const listData = document.getElementById("data");

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


const usefulData = [ "Bacia", "Reservatorio", "ReservatorioValorUtil"];


// TABELA NORTE

usefulData.forEach(dataName => {
    const tableColumn = document.createElement("td");
    tableColumn.innerHTML = dataName;
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
    tableColumn.innerHTML = dataName;
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
    tableColumn.innerHTML = dataName;
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
    tableColumn.innerHTML = dataName;
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

doGet('http://tr.ons.org.br/Content/Get/SituacaoDosReservatorios').then(result => {
    // Rederizado resultado geral no HMTL
    // result.forEach(iterateResult)

    const norteDatabase = filterBaseBySubsystem(result, "Norte");
    const nordesteDatabase = filterBaseBySubsystem(result, "Nordeste");
    const sulDatabase = filterBaseBySubsystem(result, "Sul");
    const sudesteDatabase = filterBaseBySubsystem(result, "Sudeste / Centro-Oeste");

    norteDatabase.forEach(iterateResultNorte);
    nordesteDatabase.forEach(iterateResultNordeste);
    sulDatabase.forEach(iterateResultSul);
    sudesteDatabase.forEach(iterateResultSudeste);

    const subSistemas = getSubSystems(result).map(subSystem =>
    result.filter(item => item.Subsistema == subSystem)

)

})

.catch(console.error);