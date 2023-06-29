//Inicialización de objetos a utilizar
const btnStart = document.getElementById('btn-start');
const players = (sessionStorage.getItem('players') !== null) ? JSON.parse(sessionStorage.getItem('players')) : {
    "firstPlyer": null,
    "secondPlayer": null,
    "thirdPlayer": null,
    "fourthPlayer": null
};
//Declaración de funciones
async function createPlayer(position, asignation) {
    if (players[asignation] !== null) {
        return;
    }

    const { value: nickName } = await Swal.fire({
        title: `Ingrese nombre de jugador ${position}`,
        input: 'text',
        inputLabel: 'Nombre:',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: '#4d908e',
        inputValidator: (value) => {
            if (!value) {
                return 'El nombre no puede ser vacio';
            }
        }
    });
    if (nickName !== undefined) {
        players[asignation] = {
            "name": nickName,
            "score": 0,
            "correctQuestions": 0
        };
    }
}

function savePlayers() {
    let isValidPlayersData = true;
    for (let currentPlayer in players) {
        if (players[currentPlayer] === null) {
            isValidPlayersData = false;
            break;
        }
    }
    if (isValidPlayersData) {
        sessionStorage.setItem('players', JSON.stringify(players));
        window.location.replace("pages/main.html");
    } else {
        Swal.fire('Error', 'Asegurese de completar la información de los jugadores', 'error');
    }
}

// Uso de las funciones en la logica del boton para iniciar el juego
btnStart.addEventListener('click', async () => {
    await createPlayer(1, 'firstPlyer');
    await createPlayer(2, 'secondPlayer');
    await createPlayer(3, 'thirdPlayer');
    await createPlayer(4, 'fourthPlayer');
    savePlayers();
});