let keyPress = document.querySelector("body");
let screenSymbol = document.querySelector(".input__symbol");
let shift = document.querySelector(".shift");
let language = document.querySelector(".language");
let keyActivate = document.querySelector(".click");
let playerScore = document.querySelector(".score");
let playerMiss = document.querySelector(".miss");
let playerKf = document.querySelector(".kf");
let allSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЁЖХИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя1234567890";
let latinUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let latinLowerCase = "abcdefghijklmnopqrstuvwxyz";
let cyrillicUpperCase = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
let cyrillicLowerCase = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
let nums = "1234567890";
let score = 0;
let miss = 0;
let click = 0;
let kf = 0;
// преобразование всех вимволов из строки в массив
allSymbols = allSymbols.split("");
console.log(allSymbols);

// генерируем случайное число от 0 до кол-ва элементов массива (128) и возвращаем округлённое значение
function randomSymbolGenerator(min, max){
    let rng = Math.random() * (max - min) + min;
    console.log(Math.floor(rng));
    
    return Math.floor(rng);
}

// функциональное выражение, присваиваем результат генерации в переменную в глоб. обл. видимости. 
let rngResult = randomSymbolGenerator(0, allSymbols.length);
screenSymbolInput();

console.log(allSymbols[rngResult]);

// подставляем сгенереный символ в <span>
function screenSymbolInput(){
    symbolParamsSet(rngResult);
    return screenSymbol.textContent = allSymbols[rngResult];
}

// Генерирует и выводит на экран параметры символа Shift, Ru/En.
function symbolParamsSet(){
    // проверка на Английские символы
    if(rngResult >= 0 && rngResult < 52) {
        shift.style.visibility = "hidden";
        language.style.visibility = "visible";
        language.textContent = "Eng";
            if(rngResult >= 0 && rngResult <= 25){
                shift.style.visibility = "visible";
            };
        };

    // проверка на Русов
    if(rngResult >= 52 && rngResult < 118) {
        shift.style.visibility = "hidden";
        language.style.visibility = "visible";
        language.textContent = "Ru";
            if(rngResult >= 52 && rngResult <= 85){
            shift.style.visibility = "visible";
        };
    };

    // проверка на числа
    if(rngResult >= 118 && rngResult <= 128){
        shift.style.visibility = "hidden";
        language.style.visibility = "hidden";
    };
};

function symbolParamsReset(){
    shift.classList.toggle("hidden");
}

function totalCountKeypress(event){
    if(event.key == "Shift" || event.key == "Alt" || event.key == "Control"){
        return
    }
    click++;
    keyActivate.innerHTML = click;
}

function totalScoreKeypress(){
    score++;
    playerScore.innerHTML = score;
}

function totalMissKeypress(){
    miss++;
    playerMiss.innerHTML = miss;
}

function totalKf(event){
    // убираем переключение и ctrl
    if(event.key == "Shift" || event.key == "Alt" || event.key == "Control"){
        return;
    }
    // проверка на наличие NaN
    if(miss != 0) {
        kf = click / miss;
    }
    // проверка для старта кэфа
    if(click == miss){
        kf = 0;
    }
    playerKf.innerHTML = kf.toFixed(2);
}

console.log(1/0);
// главный обработчик всех нажатий.
keyPress.addEventListener("keydown", (event) => {
    screenSymbolInput();
    totalKf(event);
    totalCountKeypress(event);
    if (event.key == "Shift" || event.key == "Alt" || event.key == "Control") {
        return;
    }
    if (event.key == allSymbols[rngResult]) {
        totalScoreKeypress(event);
        console.log("score+");
        console.log(rngResult);
        rngResult = randomSymbolGenerator(0, allSymbols.length);
        screenSymbol.textContent = allSymbols[rngResult];
        symbolParamsSet();

    }else{
        totalMissKeypress(event);
    }
})