let palabra = 'texto';
let palabraArray = palabra.toUpperCase().split('');
console.log(palabraArray);

let actualRow = document.querySelector('.row')

palabraArray.forEach((item, index) =>{
    if(index === 0){
        actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`;
    }else{
        actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`;
    }
});

let focusElement = document.querySelector('.focus');
focusElement.focus();

let squares = document.querySelectorAll('.square');
squares = [...squares]
console.log(squares);

let userInput = []

squares.forEach(e=>{
    e.addEventListener('input',event=>{
        //Recogiendo datos
        userInput.push(event.target.value.toUpperCase());
        console.log(userInput);
        if(event.target.nextElementSibling){
            event.target.nextElementSibling.focus();
        }else{
            let rightIndex = compareArrays(palabraArray, userInput);
            rightIndex.forEach(e=>{
                squares[e].classList.add('green');
            })
        }
    })
});

//Funciones

function compareArrays(array1, array2){
    let equalsIndex = [];
    array1.forEach((e,index) =>{
        if(e === array2[index]){
            console.log(`En la posición ${index} si son iguales`)
            equalsIndex.push(index);
        }else{
            console.log(`En la posición ${index} NO son iguales`)
        }
    });
    return equalsIndex;
}