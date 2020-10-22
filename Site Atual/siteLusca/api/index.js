var context = document.getElementById("chart").getContext("2d");
context.canvas.width = 800;
context.canvas.height = 300;

var configuration = {
    type: 'line',
    data: {
        datasets: [{
            label: "Temperatura   x   Tempo",
            border: "2px solid",
            type: 'line',
            backgroundColor: '#000000c4',
            borderColor: 'grey',
            borderWidth: 3,
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: '#fff'
            }
        },
        scales: {
            xAxes: [{
                gridLines: { color: "white"},
                distribution: 'series',
                scaleLabel: {
                    display: true,
                    labelString: 'Tempo (segundos)',
                    fontColor: '#fff'
                },
                ticks: {
                    beginAtZero:true,
                    fontColor: '#fff'
                }
            }],
            yAxes: [{
                gridLines: { color: "white"},
                scaleLabel: {
                    display: true,
                    labelString: 'Temperatura',
                    fontColor: '#fff'
                },
                ticks: {
                    beginAtZero:true,
                    fontColor: '#fff'
                }
            }]
        },
        animation: {
            duration: 0.5
        }
    }
};

var chart = new Chart(context, configuration);

//Função para obter os dados de temperatura do server
//Seria mais interessante fazer isso com WebSocket, porém para fins academicos, os dados serão atualizados via HTTP

//Esse atributo dentro do contexto serve para saber qual foi o último índice processado, assim eliminado os outros elementos na
//hora de montar/atualizar o gráfico
this.lastIndexTemp = 0;
this.time = 0;

function get_data(){

    var http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:5000/api', false);
    http.send(null);        
    
    var obj = JSON.parse(http.responseText);
    console.log(obj)
    if (obj.data.length == 0){
        return;
    }

    var _lastIndexTemp = this.lastIndexTemp;
    this.lastIndexTemp = obj.data.length;
    listTemp = obj.data.slice(_lastIndexTemp);

    listTemp.forEach(data => {
        //Máximo de 60 itens exibidos no gráfico
        if (chart.data.labels.length == 10 && chart.data.datasets[0].data.length == 10){
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }

        chart.data.labels.push(this.time++);
        chart.data.datasets[0].data.push(parseFloat(data));
        chart.update();
    });
    
    document.getElementById('average').textContent = obj.average;
    document.getElementById('averageHour').textContent = obj.averageHour;
} 

get_data();

setInterval(() => {
    get_data();
}, 1000);
