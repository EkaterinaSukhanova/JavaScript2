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
    var state = false;
    var timerId = 0;

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
    };

    this.launch = function () {
        if (waterAmount < 50 || coffeeAmount < 10){
            console.error('Проверьте количество кофе и воды!');
        } else {
            state = true;
            timerId = setTimeout(function () {
                console.log('Кофе готов!')
            }, calcBoilTime());

        }
    };

}

var vitek = new CoffeeMachine(8000);

vitek.addWater(50);
vitek.addCoffee(50);
console.log(vitek.getBoilTime());
vitek.launch();
// vitek.stopLaunch();