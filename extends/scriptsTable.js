
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

doGet('http://tr.ons.org.br/Content/Get/SituacaoDosReservatorios').then(result => {
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
    result.filter(item => item.Subsistema == subSystem)

)

function localStorageExpires() {
    var toRemove = [],                      // Itens para serem removidos
        currentDate = new Date().getTime(); // Data atual em milissegundos
    
    for (var i = 0, j = localStorage.length; i < j; i++) {
        var key = localStorage.key(i),
            value = localStorage.getItem(key);
        
        // Verifica o formato do item para evitar conflito com outras aplicações
        if (value && value[0] === "{" && value.slice(-1) === "}") {

            // Decodifica de volta para JSON
            var current = JSON.parse(value);

            // Checa a chave expires do item especifico se for mais antigo que a data atual é salvo no array
            if (current.expires && current.expires <= currentDate) {
                toRemove.push(key);
            }
        }
    }

    // Remove itens que já expiraram
    // Se remover no primeiro loop isto poderia afetar a ordem pois quando se remove um item geralmente o objeto ou array são reordenados
    for (var i = toRemove.length - 1; i >= 0; i--) {
        localStorage.removeItem(toRemove[i]);
    }
}

localStorageExpires(); //Auto executa a limpeza

/**
 * Função para adicionar itens no localStorage
 * @param {string} chave Chave que será usada para obter o valor posteriormente
 * @param {*} valor Quase qualquer tipo de valor pode ser adicionado, desde que não falhe no JSON.stringfy
 * @param {number} Tempo de vida em minutos do item
 */

function setLocalStorage(chave, valor, minutos) {
    var expirarem = new Date().getTime() + (1000 * minutos);

    localStorage.setItem(chave, JSON.stringify({
        "value": valor,
        "expires": expirarem
    }));
}

/**
 * Função para obter itens do localStorage que não expiraram
 * @param {string} chave Chave para obter o valor associado
 * @return {*} Retorna qualquer valor, se o item tiver expirado irá retornar undefined
 */

function getLocalStorage(chave) {
    localStorageExpires(); //Limpa itens
    
    var value = localStorage.getItem(chave);

    if (value && value[0] === "{" && value.slice(-1) === "}") {

        // Decodifica de volta para JSON
        var current = JSON.parse(value);

        return current.value;
    }
}

function setStorage() {
    let myObj = result;
    localStorage.setItem('dados', JSON.stringify(myObj));

    let myItem = JSON.parse(localStorage.getItem('dados'));

    setLocalStorage('dados', myItem, true, 23);
}

setStorage();

function getlocal(){
    var item = getLocalStorage('dados');
}

getlocal();


localStorageExpires(); //Auto executa a limpeza

})

.catch(console.error);
