const express = require('express');
const { ArduinoDataTemp } = require('./newserial')
const { ArduinoDataHumidity } = require('./serialHumidity')
const db = require('./database')
const router = express.Router();


router.get('/', (request, response, next) => {

    let sum = ArduinoDataTemp.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataTemp.List.length).toFixed(2);
	let sumHour = ArduinoDataTemp.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataTemp.ListHour.length).toFixed(2);
    
    response.json({
        data: ArduinoDataTemp.List,
        total: ArduinoDataTemp.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataTemp.ListHour,
		totalHour: ArduinoDataTemp.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/humidity', (request, response, next) => {

    let sum = ArduinoDataHumidity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataHumidity.List.length).toFixed(2);
	let sumHour = ArduinoDataHumidity.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataHumidity.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataHumidity.List,
        total: ArduinoDataHumidity.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataHumidity.ListHour,
		totalHour: ArduinoDataHumidity.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.post('/sendData', (request, response) => {
    var temp = (Math.random() * (36 - 13) + 13).toFixed(2);
    var umid = (Math.random() * (67 - 27) + 27).toFixed(2);
    
    temperature = ArduinoDataTemp.List[ArduinoDataTemp.List.length -1];
    //luminosidade = ArduinoDataLuminosity.List[ArduinoDataLuminosity.List.length -1]

    var sql = `INSERT INTO Insercoes(temp, umid) VALUES (${temp}, ${umid})`;

    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
      

    response.sendStatus(200);
})


// function sortearTemperatura() {
//     var limiteMin = -10;
//     var limiteMax = 70;
//     var minimoAbsoluto = Math.abs(limiteMin);
//     return (Math.random() * (minimoAbsoluto+limiteMax) - minimoAbsoluto).toFixed(1);
// }

module.exports = router;