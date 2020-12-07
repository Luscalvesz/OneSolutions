function consumoEnergia() {
    var quilo1 = data.value * 850 * 24 * 30 / 1000;
    var quilo2 = refri.value * 1580 * 24 * 30 / 1000;
    var quilo3 = Number(quilo1) + Number(quilo2);
    resultado1.innerHTML = `<p> Seus servidores consumirão, cerca de ${quilo1.toFixed(2)}kWh<br>
                        Sua refrigeração, consumirá na faixa de ${quilo2.toFixed(2)}kWh<br>
                                        Juntos, o consumo médio será de ${quilo3.toFixed(2)}kWh ao mês.</p>`;
};

function custoEnergia() {
    var consumo = data.value * 850 * 24 * 30 / 1000 * 0.80;
    var custo = refri.value * 1580 * 24 * 30 / 1000 * 0.80;
    var total = Number(consumo) + Number(custo);
    resultado2.innerHTML = `<p> O custo desta operação para:
                                seus servidores, será de R$ ${consumo.toFixed(2)}.<br>
                                Seus equipamentos de refrigeração, de R$ ${custo.toFixed(2)}.<br>
                                Juntos custarão R$${total.toFixed(2)} por mês.</h3>`;
};

function oneEconomia() {
    var conversao1 = data.value * 850 * 24 * 30 / 1000 * 0.80;
    var conversao2 = refri.value * 1580 * 24 * 30 / 1000 * 0.80;
    var conversao3 = Number(conversao1) + Number(conversao2);
    var conversao4 = conversao3 * 0.40;
    var conversao5 = conversao3 - conversao4;
    resultado3.innerHTML = `<p>O benefício será uma econômia de R$ ${conversao4.toFixed(2)},<br>
                                pagando apenas R$ ${conversao5.toFixed(2)} por mês.<br>
                                (Economizando em cerca de 40% da sua operação!)</p>`;
}