function add(firstNum, secondNum,){
    return firstNum + secondNum;
}

function subtract(firstNum, secondNum,){
    return firstNum - secondNum;
}

function multiply(firstNum, secondNum,){
    return firstNum * secondNum;
}

function divide(firstNum, secondNum,){
    return firstNum / secondNum;
}



//variables
let num1=null, num2=null, currentNum=null, firstOperator='', secondOperator='';
let numbers = 'onetwothreefourfivesixseveneightninezero';
let signs = '+-/*'
let signVisited = false;

const display = document.querySelector('.screen>p');
let currentDisplay = '';
//access buttons

const buttons = document.querySelectorAll('button');
buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        if(numbers.includes(button.id)){
            currentDisplay = displayNumber(currentDisplay, button.id);
            display.textContent = currentDisplay.substring(0,9);
            currentNum = stringToNum(currentDisplay);
        }else{
            executeActions(button.id);
        }
        console.log(`current: ${currentNum}`,num1, firstOperator, num2, secondOperator);
    });
});

//actions
function operate(firstNum, secondNum, sign){
    if(sign==='=' && firstNum===null && secondNum===null){
        
    }

    signVisited = true;
    let answer = null;
    store(sign);

    if(sign==='='){
        answer = num1;
    }

    if(num1!=null&&num2!=null){
        let newSign = (sign!=='=')?sign:'';
        secondNum = num2;
        switch(firstOperator){
            case "+": answer = add(firstNum, secondNum); break;
            case "-": answer = subtract(firstNum, secondNum); break;
            case "*": answer = multiply(firstNum, secondNum); break;
            case "/": answer = divide(firstNum, secondNum); break;
        }
        firstOperator = newSign;
        secondOperator = '';
        num1 = answer;
        num2 = null;
        currentNum = null;
        if (num1===Infinity){
            num1 = null;
            display.textContent = 'really?'
        }else{
            display.textContent = `${answer}`.substring(0,9);
        }
    }
}

function store(sign){
    if(firstOperator==='' && sign!=='='){
        firstOperator = sign;
    }else{
        num2 = currentNum;
        secondOperator = (sign!=='=')?sign:'';
    }
    
    if(num1===null){
        num1 = currentNum;
        currentNum = null;
    }
}

function executeActions(buttonId){
    switch(buttonId){
        case 'clear': clearAll();break;
        case 'percent': percentage();break;
        case 'sign': addSign();break;
        case 'dot':addDot();break;
        case 'add':operate(num1, num2, '+');break;
        case 'subtract':operate(num1, num2, '-');break;
        case 'divide':operate(num1, num2, '/');break;
        case 'multiply':operate(num1,num2, '*');break;
        case 'equal':operate(num1, num2, '=');break;
    }
}

function addDot(){
    if(!display.textContent.includes('.')){
        display.textContent = currentDisplay+='.';
    }

    if(signVisited === true){
        display.textContent = currentDisplay = '0.';
        signVisited = false;
    }
}

function addSign(){
    display.textContent = `${currentNum = (stringToNum(display.textContent)*-1)}`;
}

function percentage(){
    display.textContent = `${currentNum = stringToNum(display.textContent)/100}`.substring(0,9);
}

function clearAll(){
    display.textContent = currentDisplay = '0';
    currentNum = null, num1=null, 
    num2=null, firstOperator='', secondOperator='';
}

//numbers
function stringToNum(string){
    return (string.includes('.')||string.includes('e'))? parseFloat(string):parseInt(string);
}

function displayNumber(string, buttonId){
    if(string !== '0' && signVisited === false){
        string+=`${getNumber(buttonId)}`;
    }else{
        string=`${getNumber(buttonId)}`;
        signVisited = false;
    }
    return string;
}

function getNumber(buttonId){
    let number;
    switch(buttonId){
        case "zero": number = 0; break;
        case "one": number = 1; break;
        case "two": number = 2; break;
        case "three": number = 3; break;
        case "four": number = 4; break;
        case "five": number = 5; break;
        case "six": number = 6; break;
        case "seven": number = 7; break;
        case "eight": number = 8; break;
        case "nine": number = 9; break;
    }
    return number;
}