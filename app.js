const previousOperationText = document.getElementById('previous-operation')
const currentOperationText = document.getElementById('current-operation')

//console.log(previusOperationText)
//console.log(currentOperationText)

const buttons = document.querySelectorAll('#buttons-container button')

//console.log(buttons)

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText

        this.currentOperation = ''
    }

    addDigit(digit) {
        if(digit === '.' && this.currentOperationText.innerText.includes('.'))
            return;

        this.currentOperation = digit
        this.updateDisplay()
    }

    processOperation(operation) {
        //Check if current is empty
        if(this.currentOperationText.innerText === '' && operation !== 'C') {
            //Change operation
            if(this.previousOperationText !== '') {
                this.changeOperation(operation)
            }

            return;
        }

        //Get values
        let operationValue

        let previous = +this.previousOperationText.innerText.split(' ')[0]
        let current = +this.currentOperationText.innerText

        //Do operations
        switch (operation) {
            case '+':
                operationValue = previous + current
                this.updateDisplay(operationValue, operation, current, previous)
                break
            case '-':
                operationValue = previous - current
                this.updateDisplay(operationValue, operation, current, previous)
                break
            case '/':
                operationValue = previous / current
                this.updateDisplay(operationValue, operation, current, previous)
                break
            case '*':
                operationValue = previous * current
                this.updateDisplay(operationValue, operation, current, previous)
                break
            case 'CE':
                this.processClearOperation()
                break
            case 'C':
                this.processClearAllOperation()
                break
            case 'DEL':
                this.processDelOperation()
                break
            case '=':
                this.processEqualOperation()
                break
            default:
                return;
        }
    }

    processClearOperation() {
        this.currentOperationText.innerText = ''
    }

    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    processClearAllOperation() {
        this.currentOperationText.innerText = ''
        this.previousOperationText.innerText = ''
    }

    processEqualOperation() {
        const operation = previousOperationText.innerText.split(' ')[1]
        
        this.processOperation(operation)

        if(this.previousOperationText.innerText !== '') {
            this.currentOperationText.innerText = this.previousOperationText.innerText.slice(0, -1)
            this.previousOperationText.innerText = ''
        }
    }

    changeOperation(operation) {
        const mathOperations = ['+', '-', '/', '*']

        if(!mathOperations.includes(operation))
            return;

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    updateDisplay(
        operationValue = null, 
        operation = null, 
        current = null,
        previous = null) {

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        }
        else {
            if(previous === 0) {
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText

        if(+value >= 0 || value === '.') {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})