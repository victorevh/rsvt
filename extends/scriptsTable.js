window.addData = (region, earNumber) => {

    const listElement = document.getElementById("lista");
    const tableHead = document.getElementById("table-head");

    const doGet = (url) => {
        const promiseCallback = (resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) throw new Error('Erro ao executar requisição, status' + response.status);

                    return response.json();
                })

                .then((data) => {
                    localStorage.setItem('dados', JSON.stringify(data));
                    return data;
                })
                .then(resolve)
                .catch(reject);
        }
        return new Promise(promiseCallback);
    }

    const usefulData = ["Bacia", "Reservatorio", "ReservatorioPorcentagem", "ReservatorioValorUtil"];

    const dataDictionary = {
        "Bacia": "Principais Bacias",
        "Reservatorio": "Principais Reservatórios",
        "ReservatorioPorcentagem": "% do Subsistema",
        "ReservatorioValorUtil": "Valor Útil Atual em %",
    }

    usefulData.forEach(dataName => {
        const tableColumn = document.createElement("td");
        tableColumn.innerHTML = dataDictionary[dataName];
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

        function titleData() {
            const titleData = document.getElementById("titleData");
            // Organizando titulo da data com slice
            const year = result[0].Data.slice(0, 4);
            const mouth = result[0].Data.slice(5, 7);
            const day = result[0].Data.slice(8, 10);
            const titleItem = document.createElement("H1");
            titleItem.innerHTML = 'Dados atualizados em ' + day + '/' + mouth + '/' + + year;
            titleData.appendChild(titleItem);
        }
        titleData();
        if (!region) return;

        function EAR() {
            const getEAR = window.document.getElementById('EAR');
            const EAR = result[earNumber].SubsistemaValorUtil;
            const EARstringify = JSON.stringify(EAR);
            const EARslice = EARstringify.slice(0, 5);
            const titleEAR = document.createElement("h3");
            titleEAR.innerHTML = 'EAR - Energia Armazenada Disponível ' + EARslice + '%';
            getEAR.appendChild(titleEAR);

        }
        EAR();


        const Database = filterBaseBySubsystem(result, region);

        Database.forEach(iterateResult);

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


        if (data) {
            const today = new Date();
            const date = new Date((JSON.parse(data))[0].Data)
            const diffTime = Math.abs(date.getTime() - today.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < 1) {
                onsRequestHandler(JSON.parse(data));
                return onsRequestHandler;
            }
        }

        doGet('http://tr.ons.org.br/Content/Get/SituacaoDosReservatorios')
            .then(onsRequestHandler)
            .catch(console.error);

    }

    main();

}
