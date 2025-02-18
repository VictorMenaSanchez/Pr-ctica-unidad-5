/*
Referencias a los elementos.
Aquí voy a almacenar los ID´s de los elementos en constantes.
*/
/*
CONSTANTES DE LA PRIMERA SALA
*/
const introScreen = document.getElementById('intro_screen');
const startButton = document.getElementById('start_game');
const firstRoom = document.getElementById('first_room');
const resultScreen1 = document.getElementById('result_screen_1')
const roomButtons = document.querySelectorAll('.first_room_button');
const resultMessage = document.getElementById('result_message_1');
const goBack1Buttons = document.querySelectorAll('.go_back_1');



/*
Variables y constantes bomba
*/
const countdownScreen = document.getElementById('countdownScreen');
const activateDestructionButton = document.querySelector('.activate_button');
let timeoutCounter; 
let intervalCounter; 
let startTime;  
const cancelButton = document.getElementById('cancel_button');
let countdownActive = false;


/*
CONSTANTES GENERALES
*/


const endGameScreen = document.querySelector('#end_game_screen');
const reiniciarJuegoBotones = document.querySelector('.reiniciar_juego');
const endGameMessage = document.querySelector('#end_game_message')
const crono = document.querySelector('.crono')
const countdownElement = document.querySelector('.countdown')
const cronoText = document.querySelector('.crono_text')


/*
CONSTANTES DE LA SEGUNDA SALA
*/
const secondRoom = document.getElementById('second_room');
const hibernationRoom = document.getElementById('hibernation_room');
const goBackToSecondRoomButton = document.querySelectorAll('.go_back_to_second_room');
const secondRoomButtons = document.querySelectorAll('.second_room_button');
const deathRoom = document.getElementById('death_room');
const reiniciarJuegoMuerte = document.querySelector('.reiniciar_juego_2');
const endGameScreen2 = document.getElementById('end_game_screen_2');
const winGameRoom = document.getElementById('win_game_room');
const winGameButton = document.querySelector('.win_game_button');
const goBack2Buttons = document.querySelectorAll('.go_back_2');




// Pantalla de intro.
startButton.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    firstRoom.classList.remove('hidden');
});


// Lógica para las primeras zonas
roomButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        const room = event.target.dataset.room;

        if (room === 'explore') {
            // Sala con texto
            showResult('Aquí se halla el ordanador central del Star Runner, las pantallas no funcionan bien, pero al acceder a una grabación ves a un compañero siendo deborado por una criatura extraña.');
        } else if (room === 'continue') {
            // Continuar a la siguiente zona (usando Promesas con async/await)
            //Este setTimeout no me convence, debo intentar implementarlo en otra sección del juego dado que de esta manera parece que se queda "pillado". 
            alert("¿Quieres acceder a la siguiente zona? Pulsa aceptar y espera 2 segundos.")
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // showResult('Avanzas por el camino y encuentras una salida. ¡Has ganado!');
            firstRoom.classList.add('hidden');
            secondRoom.classList.remove('hidden');
        } else if (room === 'reactor') {
            // Sala con Cuenta Atrás (usando setInterval)
            firstRoom.classList.add('hidden');
            countdownScreen.classList.remove('hidden');
            
        }
    });
});


// Mostrarque hay en las salas de la zona 1.
const showResult = (message)=> {
    firstRoom.classList.add('hidden');
    resultScreen1.classList.remove('hidden');
    resultMessage.textContent = message;
}


// Regresar al puente de mando.

goBack1Buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonElement = event.currentTarget;
        const goBack = event.target.dataset.go_back_1;
        if (goBack === 'goBack') {
            resultScreen1.classList.add('hidden');
            firstRoom.classList.remove('hidden');
        }else if (goBack === 'countdown') {
            countdownScreen.classList.add('hidden');
            firstRoom.classList.remove('hidden');
            clearInterval(interval);
            countdownElement.remove();
        }else if (goBack === 'secondRoom') {
        // Volver al puente de mando desde la sala principal (second_room)
        secondRoom.classList.add('hidden');
        firstRoom.classList.remove('hidden');
    }
        
    });

});


// Función para reiniciar la cuenta atrás
const restartCountdown = () => {
    // Reiniciar el contador y las variables de la cuenta atrás
    countdownActive = false;
    clearInterval(intervalCounter);  
    clearTimeout(timeoutCounter);    
    countdownElement.textContent = ""; 
    cronoText.textContent = ""; 
    cancelButton.classList.add('hidden'); 
    cancelButton.disabled = false; 
    activateDestructionButton.classList.remove('hidden');  
    activateDestructionButton.disabled = false;  
};

// Función para activar la cuenta atrás
const activateButton = () => {
    activateDestructionButton.addEventListener('click', () => {
        // Si la cuenta atrás ya está activa, no hacemos nada
        if (countdownActive) return;

        // Desactivar el botón de autodestrucción para evitar clics múltiples
        activateDestructionButton.disabled = true;
        activateDestructionButton.classList.add('hidden'); // Ocultar el botón al iniciar la cuenta atrás

        cronoText.textContent = "PARA LA AUTODESTRUCCIÓN";
        let counter = 35;
        countdownElement.textContent = counter;

        // Iniciar cuenta atrás
        countdownActive = true;
        let startTime = Date.now();

        // Intervalo para actualizar el contador cada segundo
        intervalCounter = setInterval(() => {
            counter--;
            countdownElement.textContent = counter;

            // Si la bomba llega a 0, termina el juego
            if (counter <= 0) {
                clearInterval(intervalCounter);
                countdownElement.remove();
                cronoText.remove();
                showEndGameScreen("La nave ha sido destruida debido a la activación de colapso del reactor principal.");
            }

            // Deshabilitar el botón de cancelación si quedan 10 segundos o menos, como en la peli.
            if (counter <= 10) {
                cancelButton.disabled = true;  // Deshabilitar el botón de cancelación
            } else {
                cancelButton.disabled = false; // Habilitar el botón de cancelación
            }
        }, 1000);

        // Timeout para eliminar el botón de autodestrucción después de 35 segundos
        timeoutCounter = setTimeout(() => {
            activateDestructionButton.remove(); // Eliminar el botón de autodestrucción después de 35 segundos
        }, 35000);

        // Función para cancelar la autodestrucción
        const deactivateButton = () => {
            const timeWasted = Date.now() - startTime;

            // Si han pasado más de 25 segundos, no puedes cancelar
            if (timeWasted <= 25000) {
                clearTimeout(timeoutCounter);  // Cancela el timeout
                clearInterval(intervalCounter); // Detiene el contador
                countdownElement.remove();
                cronoText.remove();
                alert("AUTODESTRUCCIÓN CANCELADA CON ÉXITO.");

                restartCountdown(); // Reiniciar todo
            } else {
                alert("¡No puedes cancelar la autodestrucción cuando quedan 10 segundos o menos!");
            }
        };

        // Mostrar el botón de cancelación
        cancelButton.classList.remove('hidden');
        cancelButton.addEventListener('click', deactivateButton);
    });
};

// Llamar a activateButton para que funcione al cargar la página
activateButton();


// Mostrar fin de partida

const showEndGameScreen = (message)=> {
    firstRoom.classList.add('hidden');
    secondRoom.classList.add('hidden');
    resultScreen1.classList.add('hidden');
    countdownScreen.classList.add('hidden');
    endGameScreen.classList.remove('hidden');
    winGameRoom.classList.add('hidden');
    hibernationRoom.classList.add('hidden');
    deathRoom.classList.add('hidden');
    endGameMessage.innerHTML = message;
    
}


//Reiniciar juego desde el principio

const reiniciarJuego = () =>{
    reiniciarJuegoBotones.addEventListener('click', () =>{
        location.reload()
    })
}
reiniciarJuego()



// Componente web personalizado
class GameTitle extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<h1 style="color: #4CAF50;">Juego de rol espacial:</h1>';
    }
}


customElements.define('game-title', GameTitle);

// Agregar componente al inicio
introScreen.insertAdjacentHTML('afterbegin', '<game-title></game-title>');




// Lógica para las segundas zonas
secondRoomButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        const room2 = event.target.dataset.room2;

        if (room2 === 'death') {
            // Sala con texto
            // showEndGameScreen2()
            // showResult2('Aquí te mata el alien.');
            showEndGameScreen("Un alien se avalanza sobre ti clavando sus garras en tu cuerpo, has perdido.");
        } else if (room2 === 'win_game') {
           
            
        } else if (room2 === 'reactor') {
            
            secondRoom.classList.add('hidden');
            countdownScreen.classList.remove('hidden');
            
        }
    });
});


const showEndGameScreen2 = (message)=> {
    secondRoom.classList.add('hidden');
    deathRoom.classList.add('hidden');
    // countdownScreen.classList.add('hidden');
    endGameScreen2.classList.remove('hidden');
    endGameMessage2.innerHTML = message;
    
}

// Mostrarque hay en las salas de la zona 2.
const showResult2 = (message)=> {
    secondRoom.classList.add('hidden');
    deathRoom.classList.remove('hidden');
    // deathRoom.textContent = message;
    document.querySelector('#death_room p').textContent = message;
}

//Reiniciar juego desde el principio por muerte

const reiniciarJuego2 = () =>{
    reiniciarJuegoMuerte.addEventListener('click', () =>{
        location.reload()
    })
}
reiniciarJuego2()



// Regresar al comedor (sala principal)
goBack2Buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const goBack = event.currentTarget.dataset.go_back_2;

        if (goBack === 'secondRoom') {
            // Ocultar todas las salas secundarias
            winGameRoom.classList.add('hidden');
            hibernationRoom.classList.add('hidden');
            // Mostrar la sala principal (second_room)
            secondRoom.classList.remove('hidden');
        }
    });
});

// Manejo de los botones en second_room para abrir las cápsulas de escape o hibernación
secondRoomButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const room2 = event.target.dataset.room2;

        if (room2 === 'win_game') {
            // Oculta la segunda sala y muestra las cápsulas de escape
            secondRoom.classList.add('hidden');
            winGameRoom.classList.remove('hidden');
        } else if (room2 === 'explore_more') {
            // Oculta la segunda sala y muestra las cápsulas de hibernación
            secondRoom.classList.add('hidden');
            hibernationRoom.classList.remove('hidden');
        }
    });
});



// Lógica para el botón "ESCAPAR DEL STAR RUNNER"
winGameButton.addEventListener('click', () => {
    // Cuando se presiona el botón, muestra la pantalla de fin de juego
    showEndGameScreen("¡Has escapado del Star Runner con éxito! ¡Felicidades!");
});