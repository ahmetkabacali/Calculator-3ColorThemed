"use strict"
const themeSwitcher = document.querySelector(".theme-switcher")
const linkStyle = document.querySelector('link[href="./src/css/theme1.css"]')
const numpadWrapper = document.querySelector(".numpad-wrapper")
const screen = document.querySelector(".screen")
let displayValue = "0";
let valueHolder = null
let operator = null

let secondValueControl = false

/////////////////////////////////////////
themeSwitcher.addEventListener("click", function () {
    let themeControl = themeSwitcher.classList
    if (themeControl.contains("theme-1")) {
        themeSwitcher.className = "theme-switcher theme-2"
        themeSwitcher.style.justifyContent = "center"
        linkStyle.setAttribute("href", "./src/css/theme2.css")

    } else if (themeControl.contains("theme-2")) {
        themeSwitcher.className = "theme-switcher theme-3"
        themeSwitcher.style.justifyContent = "end"
        linkStyle.setAttribute("href", "./src/css/theme3.css")

    } else if (themeControl.contains("theme-3")) {
        themeSwitcher.className = "theme-switcher theme-1"
        themeSwitcher.style.justifyContent = "start"
        linkStyle.setAttribute("href", "./src/css/theme1.css")
    }
})

/////////////////////////////////////////
numpadWrapper.addEventListener("click", function (clickedTag) {
    if (!clickedTag.target.matches("button")) return;
    const clickedNum = clickedTag.target.value

    switch (clickedNum) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(clickedNum)
            break;
        case ".":
            inputDecimal()
            break;
        case "DEL":
            delLastInput();
            break;
        case "RESET":
            clear()
            break;
        default:
            inputNumber(clickedNum);
            break;
    }
    updateDisplay()
})

/////////////////////////////////////////////////////////////////////
updateDisplay()
function updateDisplay() {
    screen.innerText = displayValue
}

/////////////////////////////////////////
function inputNumber(params) {
    if (secondValueControl) {
        displayValue = params
        secondValueControl = false
    } else {
        displayValue = displayValue === "0" ? params : displayValue + params
    }
}

/////////////////////////////////////////
function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += "."
        updateDisplay()
        return
    }
}

/////////////////////////////////////////
function delLastInput() {
    displayValue = displayValue.slice(0, -1);
}

/////////////////////////////////////////
function clear() {
    displayValue = 0
}

/////////////////////////////////////////
function handleOperator(params) {
    const value = parseFloat(displayValue)
    if (operator && secondValueControl) {
        operator = params
        return
    }
    if (valueHolder === null) {
        valueHolder = value
    } else if (operator) {
        const result = calculate(valueHolder, value, operator)
        displayValue = `${parseFloat(result.toFixed(7))}`
        valueHolder = result;
    }
    secondValueControl = true
    operator = params
}

/////////////////////////////////////////
function calculate(first, second, operator) {
    if (operator === "+") {
        return first + second
    }
    if (operator === "-") {
        return first - second
    }
    if (operator === "/") {
        return first / second
    }
    if (operator === "*") {
        return first * second
    }
    if (operator === "=") {
        return second
    }
}





