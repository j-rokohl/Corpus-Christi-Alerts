// Get waterdatafortexas.org data for local Lake Levels

// Choke Canyon Reservoir near Three Rivers
fetch('https://waterdata.usgs.gov/nwis/dv?cb_00054=on&cb_62614=on&format=rdb&site_no=08206900&legacy=&referred_module=sw&period=&begin_date=2024-10-25')
    .then(response => response.text()) // Convert the response to text
    .then(csvText => {
        const lines = csvText.split('\n');
        const parsedData = lines.map(line => line.split(','));
        console.log('Parsed CSV data:', parsedData);
        let dataLength = parsedData.length;

        console.log(parsedData[0][0]);

        let newList = [];
        for (let i = 0; i < dataLength; i++) {
            if (!parsedData[i][0].includes('#')) {
                let numbersArray = parsedData[i][0].split('\t');
                newList.push(numbersArray)
            }
        }

        let finalLen = newList.length;
        document.getElementById("chokeCanyon").innerHTML = newList[finalLen - 3][7]; // The Latest Level

        document.getElementById("chokeCanyonDate").innerHTML = newList[finalLen - 3][2]; // The Latest Date

        let fullPool = 220.50 - newList[finalLen - 3][7];
        document.getElementById("chokeCanyonLevel").innerHTML = fullPool.toFixed(2);; // Amount Below Full Pool
    })
    .catch(error => {
        console.error('Error fetching or parsing CSV:', error);
    });

// Lake Corpus Christi near Mathis, TX
fetch('https://waterdata.usgs.gov/nwis/dv?cb_00054=on&cb_62614=on&format=rdb&site_no=08210500&legacy=&referred_module=sw&period=&begin_date=2024-10-25')
    .then(response => response.text()) // Convert the response to text
    .then(csvText => {
        const lines = csvText.split('\n');
        const parsedData = lines.map(line => line.split(','));
        console.log('Parsed CSV data:', parsedData);
        let dataLength = parsedData.length;

        console.log(parsedData[0][0]);

        let newList = [];
        for (let i = 0; i < dataLength; i++) {
            if (!parsedData[i][0].includes('#')) {
                let numbersArray = parsedData[i][0].split('\t');
                newList.push(numbersArray)
            }
        }
        let finalLen = newList.length;
        document.getElementById("lakeCC").innerHTML = newList[finalLen - 3][15]; // The Latest Level

        document.getElementById("lakeCCDate").innerHTML = newList[finalLen - 3][2]; // The Latest Date

        let fullPool = 94 - newList[finalLen - 3][15];
        document.getElementById("lakeCCLevel").innerHTML = fullPool.toFixed(2);; // Amount Below Full Pool
    })
    .catch(error => {
        console.error('Error fetching or parsing CSV:', error);
    });