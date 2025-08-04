const previousDisp = document.querySelector('.previous');
const resultDisp = document.querySelector('.result');
const buttons = document.querySelectorAll('.btn');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');

let firstNum ="";
let secondNum ="";
let operator ="";
let result ="";
let isError = false;
let resultDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () =>{
        if(isError) return;
        const value = button.textContent;

        if(!isNaN(value) || value === "."){
            handleNum(value);
        }
        else if (value === "+" || value === "-" || value === "*" || value === "/"){
            handleOperator(value);
        }
        else if (value === "=" ){
            handleEqual(value)
        }
    })
});

function handleNum(value){
    if(value === "." && ((operator === "" && firstNum.includes(".")) || (operator !== "" && secondNum.includes(".")))){
        return;
    }
    if(operator === ""){
        firstNum += value;
        resultDisp.textContent = firstNum;
    }
    else{
        secondNum += value;
        resultDisp.textContent = secondNum;
        previousDisp.textContent = `${firstNum} ${operator}`;
    }
}

function handleOperator(value){
    if(firstNum !=="" && secondNum !== ""){
        switch(operator){
            case "+":
                result = parseFloat(firstNum)+parseFloat(secondNum);
                break;
            case "-":
                result = parseFloat(firstNum)-parseFloat(secondNum);
                break;
            case "*":
                result = parseFloat(firstNum)*parseFloat(secondNum);
                 break;
            case "/":
                if(parseFloat(secondNum) === 0){
                    result = "ERROR";
                    
                }
                else{
                    result = parseFloat(firstNum)/parseFloat(secondNum);
                }
                break;
            default:
                result = "Invalid";
        }
        firstNum = result;
        secondNum = "";
        resultDisp.textContent = "";        
    }
    operator = value;
    previousDisp.textContent = `${firstNum} `;
    resultDisp.textContent=`${operator}`;

}

function handleEqual(value){
    if(isError) return;
    if(firstNum !== "" && secondNum !== "" && operator !== ""){
        switch(operator){
            case "+":
                result = parseFloat(firstNum)+parseFloat(secondNum);
                break;
            case "-":
                result = parseFloat(firstNum)-parseFloat(secondNum);
                break;
            case "*":
                result = parseFloat(firstNum)*parseFloat(secondNum);
                 break;
            case "/":
                if(parseFloat(secondNum) === 0){
                    result = "ERROR";
                    isError = true;
                }
                else{
                    result = parseFloat(firstNum)/parseFloat(secondNum);
                }
                break;
            default:
                result = "Invalid";
        }
        previousDisp.textContent = `${firstNum} ${operator} ${secondNum}`;
        resultDisp.textContent = result;
        resultDisplay = true;

        firstNum = result;
        secondNum = "";
        result = "";
    }
}

clear.addEventListener('click',()=>{
    handleClr();
})

del.addEventListener('click', () =>{
    handleDelete();
})

function handleClr(){
    firstNum = "";
    secondNum = "";
    operator = "";
    resultDisp.textContent = "";
    previousDisp.textContent = "";
    isError = false;
    resultDisplay = false;
}

function handleDelete() {
    if (resultDisplay) return;

    if (secondNum !== "") {
        secondNum = secondNum.slice(0, -1);
        if(secondNum === ""){
            resultDisp.textContent =  operator;
            previousDisp.textContent = `${firstNum}`;
        }
        else{
            resultDisp.textContent = secondNum;
            previousDisp.textContent = `${firstNum} ${operator}`;
        }
    } else if (operator !== "") {
        operator = "";
        resultDisp.textContent = firstNum;
        previousDisp.textContent = "";
    } else {
        firstNum = firstNum.slice(0, -1);
        resultDisp.textContent = firstNum;
    }
}

document.addEventListener('keydown',(e)=>{
    const key = e.key;
    if(key === "Backspace"){
        handleDelete();
    }
    if(!isNaN(key) || key === "."){
        handleNum(key);
    }
    if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleOperator(key);
    }
    if (key === "Enter" || key === "=") {
        handleEqual();
    }
    if (key === "Escape") {
        handleClr();
    }

})
