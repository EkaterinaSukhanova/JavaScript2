'use strict';

// / ДЗ
// добавить зерна
// проверку на пустую кофеварку
// реализовать метод стоп для кофеварки

function CoffeeMachine(power) {
    var waterAmount = 0;
    var coffeeAmount = 0;
    var maxTemp = 90;
    var waterHeatCapacity = 4200;
    var timerId = 0;

    this.getAmountWater = function () {
        return waterAmount;
    };

    this.getAmountCoffee = function () {
        return coffeeAmount;
    };

    this.addWater = function (newAmount) {
        if (newAmount > 0) {
            waterAmount += newAmount;
        } else {
            console.error('Добавьте больше воды!');
        }
    };

    this.addCoffee = function (newAmount) {
        if (newAmount > 0) {
            coffeeAmount += newAmount;
        } else{
            console.error('Добавьте больше кофе!');
        }
    };

    var calcBoilTime = function () {
        return (waterAmount * waterHeatCapacity * maxTemp) / power;
    };

    this.getBoilTime = function() {
        return calcBoilTime();
    };

    this.stopLaunch = function () {
        clearTimeout(timerId);
        var div = document.querySelector("div.end");
        div.innerText = "Ожидание";
    };

    this.launch = function () {
        var div = document.querySelector("div.end");
        var divWater = document.querySelector("div.amount-water");
        var divCoffee = document.querySelector("div.amount-coffee");

        div.innerText = "Выполнение";

        if (waterAmount < 50 || coffeeAmount < 10){
            div.innerText = "Проверьте количество кофе и воды!";
            console.error("Проверьте количество кофе и воды!");
        } else {
            timerId = setTimeout(function () {
                div.innerText = "Кофе готов!";

                waterAmount -= 50;
                coffeeAmount -= 10;

                divWater.innerText = `Количество воды: ${waterAmount} мл`;
                divCoffee.innerText = `Количество кофе: ${coffeeAmount} г`;
            }, calcBoilTime());


        }
    };

}

var vitek = new CoffeeMachine(8000);

function addWater20() {
    vitek.addWater(20);
    var div = document.querySelector("div.amount-water");
    div.innerText = `Количество воды: ${vitek.getAmountWater()} мл`;
}

function addCoffee5() {
    vitek.addCoffee(5);
    var div = document.querySelector("div.amount-coffee");
    div.innerText = `Количество кофе: ${vitek.getAmountCoffee()} г`;
}

document.addEventListener("DOMContentLoaded", function () {
    var water = document.querySelector("button.add-water");
    water.addEventListener("click", addWater20);

    var coffee = document.querySelector("button.add-coffee");
    coffee.addEventListener("click", addCoffee5);

    var start = document.querySelector("button.start");
    start.addEventListener("click", vitek.launch);

    var stop = document.querySelector("button.stop");
    stop.addEventListener("click", vitek.stopLaunch);
});

// vitek.addWater(50);
// vitek.addCoffee(50);
// console.log(vitek.getBoilTime());
// vitek.launch();
// vitek.stopLaunch();