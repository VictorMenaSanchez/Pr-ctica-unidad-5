/*
Referencias a los elementos.
Aquí voy a almacenar los ID´s de los elementos en constantes.
*/

const introScreen = document.getElementById('intro_screen');
const startButton = document.getElementById('start_game');
const firstRoom = document.getElementById('first_room');
const resultScreen1 = document.getElementById('result_screen_1')
const roomButtons = document.querySelectorAll('.first_room_button');
const resultMessage = document.getElementById('result_message_1');
const goBack1Buttons = document.querySelectorAll('.go_back_1');
const countdownScreen = document.getElementById('countdownScreen');
const activateDestructionButton = document.querySelector('.activate_button');
const endGameScreen = document.querySelector('#end_game_screen');
const reiniciarJuegoBotones = document.querySelector('.reiniciar_juego');
const endGameMessage = document.querySelector('#end_game_message')
const crono = document.querySelector('.crono')
const countdownElement = document.querySelector('.countdown')
const cronoText = document.querySelector('.crono_text')


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
            showResult('Aquí se halla el ordanador central del Star Runner.');
        } else if (room === 'continue') {
            // Continuar a la siguiente zona (usando Promesas con async/await)
            await new Promise(resolve => setTimeout(resolve, 1000));
            showResult('Avanzas por el camino y encuentras una salida. ¡Has ganado!');
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
        }

        
        
    });

})


// Activar autodestrucción
const activateButton = () => {
    activateDestructionButton.addEventListener('click', () => {
            cronoText.textContent = "PARA LA AUTODESTRUCCIÓN"
            let counter = 5;
            countdownElement.textContent = counter;
            const interval = setInterval(() => {
                counter--;
                countdownElement.textContent = counter;

                if (counter <= 0) {
                    clearInterval(interval);
                    countdownElement.remove();
                    cronoText.remove();
                    showEndGameScreen("La nave ha sido destrudida debido a la activación de colapso del reactor principal.")
                }
                setTimeout(activateDestructionButton.remove(), 5000)
            }, 1000);

            
    } )
}

activateButton()


// Mostrar fin de partida

const showEndGameScreen = (message)=> {
    firstRoom.classList.add('hidden');
    resultScreen1.classList.add('hidden');
    countdownScreen.classList.add('hidden');
    endGameScreen.classList.remove('hidden');
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

