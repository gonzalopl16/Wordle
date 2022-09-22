let resultElement = document.querySelector('.result');
let rowId = 1;
let mainContainer = document.querySelector('.main-container')

let palabra = 'texto';
let palabraArray = palabra.toUpperCase().split('');
console.log(palabraArray);

let actualRow = document.querySelector('.row')

drawSquares(actualRow);
listenInput(actualRow)

addFocus(actualRow);

function listenInput(actualRow) {
    let squares = actualRow.querySelectorAll('.square');
    squares = [...squares]
    console.log(squares);

    let userInput = []

    squares.forEach(e => {
        e.addEventListener('input', event => {
            //Si no se ha borrado
            if (event.inputType !== 'deleteContentBackward') {
                //Recogiendo datos
                userInput.push(event.target.value.toUpperCase());
                if (event.target.nextElementSibling) {
                    event.target.nextElementSibling.focus();
                } else {
                    //Cambiar el estilo de los inputs correctos
                    let rightIndex = compareArrays(palabraArray, userInput);
                    rightIndex.forEach(e => {
                        squares[e].classList.add('green');
                    });
                    //si los arreglos son iguales
                    if (rightIndex.length === palabraArray.length) {
                        showResult('Ganaste!');

                        return;
                    }
                    //Cambiar estilos si existe la letra pero no esta en la posición correcta
                    let existPalabraArray = existPalabra(palabraArray, userInput);
                    existPalabraArray.forEach(e => {
                        squares[e].classList.add('gold')
                    })

                    //Crear una nueva fila
                    let actualRow = createRow();
                    if (actualRow) {
                        drawSquares(actualRow);
                        listenInput(actualRow);
                        addFocus(actualRow);
                    } else {
                        return;
                    }
                    //Crear una linea de inputs
                }
            }else{
                userInput.pop();
            }
            console.log(userInput);
        })
    });
}




//Funciones

function compareArrays(array1, array2) {
    let equalsIndex = [];
    array1.forEach((e, index) => {
        if (e === array2[index]) {
            console.log(`En la posición ${index} si son iguales`)
            equalsIndex.push(index);
        } else {
            console.log(`En la posición ${index} NO son iguales`)
        }
    });
    return equalsIndex;
}

function existPalabra(array1, array2) {
    let existPalabraArray = [];
    array2.forEach((e, index) => {
        if (array1.includes(e)) {
            existPalabraArray.push(index);
        }
    });
    return existPalabraArray;
}

function createRow() {
    rowId++;
    if (rowId <= 5) {
        let newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.setAttribute('id', rowId);
        console.log(newRow)
        mainContainer.appendChild(newRow)
        return newRow;
    } else {
        showResult(`intenta de nuevo, la respuesta correcta era ${palabra.toUpperCase()}`);
    }
}

function drawSquares(actualRow) {
    palabraArray.forEach((item, index) => {
        if (index === 0) {
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`;
        } else {
            actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`;
        }
    });
}

function addFocus(actualRow) {
    let focusElement = actualRow.querySelector('.focus');
    focusElement.focus();
}

function showResult(mensaje) {
    resultElement.innerHTML = `<p>${mensaje}</p>
                        <button class="button">Reiniciar</button>`
    let resetBtn = document.querySelector('button');
    resetBtn.addEventListener('click', () => {
        location.reload();
    })
}