const express = require("express");
const { ArduinoDataTemp } = require("./newserial");
const { ArduinoDataHumidity } = require("./serialHumidity");
const db = require("./database");
const router = express.Router();


router.get("/", (request, response, next) => {
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
    averageHour: isNaN(averageHour) ? 0 : averageHour,
  });
});

router.get("/humidity", (request, response, next) => {
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
    averageHour: isNaN(averageHour) ? 0 : averageHour,
  });
});


router.get("/sendData", (request, response) => {
const temperature = ArduinoDataTemp.List[ArduinoDataTemp.List.length - 1];
const Humidity = ArduinoDataHumidity.List[ArduinoDataHumidity.List.length - 1];

db.conectar()
    .then(() => {
        const sql = `
        INSERT into dbo.registro (dataTemp, temperatura, umidade, fkSensor)
        values ('${agora()}', ${temperature}, ${Humidity}, 1),
        ('${agora()}', ${temperature + 5}, ${Humidity + 3}, 2)`;
        console.log(sql);
    return db.sql.query(sql).then(()=>{
        console.log("Registro inserido com sucesso! \n");
    });;
    })
    .catch((erro) => {
    console.error(`Erro ao tentar registrar aquisição na base: ${erro}`);
    })
    .finally(() => {
    db.sql.close();
    });

response.sendStatus(200);
});


function agora() {
    const agora_d = new Date();
    return `${agora_d.getFullYear()}-${agora_d.getMonth()+1}-${agora_d.getDate()} ${agora_d.getHours()}:${agora_d.getMinutes()}:${agora_d.getSeconds()}`;
}

module.exports = router;
