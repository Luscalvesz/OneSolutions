
    var context = document.getElementById("chart").getContext("2d");
    context.canvas.width = 1000;
    context.canvas.height = 300;

		var configuration = {
        type: 'line',
			data: {
        datasets: [{
        label: "Temperatura x Tempo",
					type: 'line',
					borderColor: '#F02B24',
					borderWidth: 3,
					backgroundColor: '#000000a3'
				}]
			},
			options: {
        scales: {
        xAxes: [{
        gridLines: {color: "white"},
						//type: 'value',
						distribution: 'series',
						scaleLabel: {
        display: true,
							labelString: 'Tempo'
						},
						ticks: {
        beginAtZero: true
						}
					}],
					yAxes: [{
        gridLines: {color: "white"},
						scaleLabel: {
        display: true,
							labelString: 'Temperatura'
						},
						ticks: {
        beginAtZero: true
						}
					}]
				},
				animation: {
        duration: 0
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



		function get_data() {

			var http = new XMLHttpRequest();
			http.open('GET', 'http://localhost:3000/api', false);
			http.send(null);

			var obj = JSON.parse(http.responseText);
			if (obj.data.length == 0) {
				return;
			}

			var _lastIndexTemp = this.lastIndexTemp;
			this.lastIndexTemp = obj.data.length;
			listTemp = obj.data.slice(_lastIndexTemp);

			listTemp.forEach(data => {
				//Máximo de 60 itens exibidos no gráfico
				if (chart.data.labels.length == 10 && chart.data.datasets[0].data.length == 10) {
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

		//Second Graphic

		var context2 = document.getElementById("chart-humidity").getContext("2d");
		context2.canvas.width = 1000;
		context2.canvas.height = 300;

		var humidity = {
        type: 'line',
			data: {
        datasets: [{
        label: "Umidade x Tempo",
					type: 'line',
					borderWidth: 3,
					borderColor: '#ff6200',
					backgroundColor: '#000000a3',
				}]
			},
			options: {
        scales: {
        xAxes: [{
        gridLines: {color: "white"},
						//type: 'value',
						scaleLabel: {
        display: true,
							labelString: 'Tempo'
						},
						distribution: 'series',
						ticks: {
        beginAtZero: true
						}
					}],
					yAxes: [{
        gridLines: {color: "white"},
						scaleLabel: {
        display: true,
							labelString: 'Umidade',
						},
						ticks: {
        beginAtZero: true
						}
					}]
				},
				animation: {
        duration: 0
				}
			}
		};



		var chartHumidity = new Chart(context2, humidity);

		//Função para obter os dados de temperatura do server
		//Seria mais interessante fazer isso com WebSocket, porém para fins academicos, os dados serão atualizados via HTTP

		//Esse atributo dentro do contexto serve para saber qual foi o último índice processado, assim eliminado os outros elementos na
		//hora de montar/atualizar o gráfico
		this.lastIndexTempHumidity = 0;
		this.timeHumidity = 0;

		function get_dataHumidity() {

			var http = new XMLHttpRequest();
			http.open('GET', 'http://localhost:3000/api/humidity', false);
			http.send(null);

			var obj = JSON.parse(http.responseText);
			if (obj.data.length == 0) {
				return;
			}

			var _lastIndexTemp = this.lastIndexTempHumidity;
			this.lastIndexTempHumidity = obj.data.length;
			listTemp = obj.data.slice(_lastIndexTemp);

			listTemp.forEach(data => {
				//Máximo de 60 itens exibidos no gráfico
				if (chartHumidity.data.labels.length == 10 && chartHumidity.data.datasets[0].data.length == 10) {
        chartHumidity.data.labels.shift();
					chartHumidity.data.datasets[0].data.shift();
				}

				chartHumidity.data.labels.push(this.time++);
				chartHumidity.data.datasets[0].data.push(parseFloat(data));
				chartHumidity.update();
			});

			document.getElementById('averageHumidity').textContent = obj.average;
			document.getElementById('averageHourHumidity').textContent = obj.averageHour;
		}

		get_dataHumidity();

		//Thirty Graphic

		// var context3 = document.getElementById("chart-switch").getContext("2d");
		// context3.canvas.width = 1000;
		// context3.canvas.height = 300;

		// var switch_sensor = {
        // 	type: 'line',
        // 	data: {
        // 		datasets: [{
        // 			label: "Switch x Time",
        // 			type: 'line',
        // 			borderColor: ['#ae3f3f'],
        // 			backgroundColor: ['#c97f7f']
        // 		}]
        // 	},
        // 	options: {
        // 		scales: {
        // 			xAxes: [{
        // 				//type: 'value',
        // 				distribution: 'series',
        //                 ticks: {
        //                     beginAtZero:true
        //                 }
        // 			}],
        // 			yAxes: [{
        // 				scaleLabel: {
        // 					display: true,
        // 					labelString: 'Switch'
        //                 },
        //                 ticks: {
        //                     beginAtZero:true
        //                 }
        // 			}]
        // 		},
        // 		animation: {
        // 			duration: 0
        // 		}
        // 	}
        // };

        // var chartSwitch = new Chart(context3, switch_sensor);

        //Função para obter os dados de temperatura do server
        //Seria mais interessante fazer isso com WebSocket, porém para fins academicos, os dados serão atualizados via HTTP

        //Esse atributo dentro do contexto serve para saber qual foi o último índice processado, assim eliminado os outros elementos na
        //hora de montar/atualizar o gráfico
        // this.lastIndexTempHumidity = 0;
        // this.timeSwitch = 0;

        // function get_switch(){

        //     var http = new XMLHttpRequest();
        //     http.open('GET', 'http://localhost:3000/api/switch', false);
        //     http.send(null);        

        //     var obj = JSON.parse(http.responseText);
        //     if (obj.data.length == 0){
        //         return;
        //     }

        //     var _lastIndexTemp = this.lastIndexTempSwitch;
        //     this.lastIndexTempSwitch = obj.data.length;
        //     listTemp = obj.data.slice(_lastIndexTemp);

        //     listTemp.forEach(data => {
        //         //Máximo de 60 itens exibidos no gráfico
        //         if (chartSwitch.data.labels.length == 10 && chartSwitch.data.datasets[0].data.length == 10){
        //             chartSwitch.data.labels.shift();
        //             chartSwitch.data.datasets[0].data.shift();
        //         }

        //         chartSwitch.data.labels.push(this.time++);
        //         chartSwitch.data.datasets[0].data.push(parseFloat(data));
        //         chartSwitch.update();
        // 	});

        // } 

        // get_switch();

        //Fourty Graphic

        // var context4 = document.getElementById("chart-lumi").getContext("2d");
        // context4.canvas.width = 1000;
        // context4.canvas.height = 300;

        // var lumi_sensor = {
        // 	type: 'line',
        // 	data: {
        // 		datasets: [{
        // 			label: "Luminosity x Time",
        // 			type: 'line',
        // 			borderColor: ['#ffff19'],
        // 			backgroundColor: ['#ffff7f']
        // 		}]
        // 	},
        // 	options: {
        // 		scales: {
        // 			xAxes: [{
        // 				//type: 'value',
        // 				distribution: 'series',
        //                 ticks: {
        //                     beginAtZero:true
        //                 }
        // 			}],
        // 			yAxes: [{
        // 				scaleLabel: {
        // 					display: true,
        // 					labelString: 'Luminosity'
        //                 },
        //                 ticks: {
        //                     beginAtZero:true
        //                 }
        // 			}]
        // 		},
        // 		animation: {
        // 			duration: 0
        // 		}
        // 	}
        // };

        // var chartLumi = new Chart(context4, lumi_sensor);

        //Função para obter os dados de temperatura do server
        //Seria mais interessante fazer isso com WebSocket, porém para fins academicos, os dados serão atualizados via HTTP

        //Esse atributo dentro do contexto serve para saber qual foi o último índice processado, assim eliminado os outros elementos na
        //hora de montar/atualizar o gráfico
        // this.lastIndexLumi = 0;
        // this.timeLumi = 0;

        // function get_lumi(){

        //     var http = new XMLHttpRequest();
        //     http.open('GET', 'http://localhost:3000/api/luminosity', false);
        //     http.send(null);        

        //     var obj = JSON.parse(http.responseText);
        // 	console.log(obj)
        //     if (obj.data.length == 0){
        //         return;
        //     }

        //     var _lastIndexTemp = this.lastIndexLumi;
        //     this.lastIndexLumi = obj.data.length;
        //     listTemp = obj.data.slice(_lastIndexTemp);

        //     listTemp.forEach(data => {
        //         //Máximo de 60 itens exibidos no gráfico
        //         if (chartLumi.data.labels.length == 10 && chartLumi.data.datasets[0].data.length == 10){
        //             chartLumi.data.labels.shift();
        //             chartLumi.data.datasets[0].data.shift();
        //         }

        //         chartLumi.data.labels.push(this.time++);
        //         chartLumi.data.datasets[0].data.push(parseFloat(data));
        //         chartLumi.update();
        // 	});

        // 	document.getElementById('averageLumi').textContent = obj.average;
        // 	document.getElementById('averageHourLumi').textContent = obj.averageHour;

        // } 

        // get_lumi();

        setInterval(() => {
            get_data();
            get_dataHumidity();
            // get_switch();
            // get_lumi();
        }, 1000);