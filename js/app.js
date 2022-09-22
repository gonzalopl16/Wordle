let resultElement = document.querySelector('.result');
let rowId = 1;
let mainContainer = document.querySelector('.main-container')

generar();

function generar(){
    //petición api
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6e17df6700msh032dafa429941a9p1bc93ejsn4109dbd3b09d',
            'X-RapidAPI-Host': '1000-most-common-words.p.rapidapi.com'
        }
    };
    fetch('https://1000-most-common-words.p.rapidapi.com/words/spanish?words_limit=1', options)
    .then(result => result.json())
    .finally(()=>{
        let loadingElement = document.querySelector('.loading')
        loadingElement.style.display = 'none';
    })
    .then(data => {
        console.log(data)
        let palabra = data[0];
        if(palabra.length <= 6){
            let palabraArray = palabra.toUpperCase().split('');

            let actualRow = document.querySelector('.row')
    
            drawSquares(actualRow);
            listenInput(actualRow)
    
            addFocus(actualRow);
    
            function listenInput(actualRow) {
                let squares = actualRow.querySelectorAll('.square');
                squares = [...squares]
    
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
                                //Crear arrelgo con letras llenas
                                let squaresFilled = document.querySelectorAll('.square');
                                squaresFilled = [...squaresFilled];
                                let lastSquaresFilled = squaresFilled.slice(-palabra.length);
                                let finalUserInput = [];
                                lastSquaresFilled.forEach((e) => {
                                    finalUserInput.push(e.value.toUpperCase());
                                })
                                console.log(finalUserInput);
                                //Cambiar el estilo de los inputs correctos
                                let rightIndex = compareArrays(palabraArray, finalUserInput);
                                rightIndex.forEach(e => {
                                    squares[e].classList.add('green');
                                });
                                //si los arreglos son iguales
                                if (rightIndex.length === palabraArray.length) {
                                    showResult('Ganaste!');
    
                                    return;
                                }
                                //Cambiar estilos si existe la letra pero no esta en la posición correcta
                                let existPalabraArray = existPalabra(palabraArray, finalUserInput);
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
                        } else {
                            userInput.pop();
                        }
                    })
                });
            }
    
    
    
    
            //Funciones
    
            function compareArrays(array1, array2) {
                let equalsIndex = [];
                array1.forEach((e, index) => {
                    if (e === array2[index]) {
                        equalsIndex.push(index);
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
        }else {
            generar();
        }
        
    })


}
