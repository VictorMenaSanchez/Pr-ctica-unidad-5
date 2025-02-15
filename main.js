/*
Referencias a los elementos.
Aquí voy a almacenar los ID´s de los elementos en constantes.
*/

const introScreen = document.getElementById('intro_screen');
const startButton = document.getElementById('start_game');
const firstRoom = document.getElementById('first_room');

// Pantalla de intro.
startButton.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    firstRoom.classList.remove('hidden');
});