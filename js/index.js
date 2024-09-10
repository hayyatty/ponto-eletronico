const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
btnBaterPonto.addEventListener("click", register);

const dialogPonto = document.getElementById("dialog-ponto");

const btnDialogFechar = document.getElementById("btn-dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

// TO-DO:
// A data e hora do dialog devem ser atualizadas automaticamente
// a hora a cada segundo e a data sempre 00:00:00
// o setInterval do dialog tem que ser desativado ao fechar o dialog
const dialogData = document.getElementById("dialog-data");
dialogData.textContent = "Data: " + getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = "Hora: " + getCurrentHour();

diaSemana.textContent = getWeekDay();
diaMesAno.textContent = getCurrentDate();

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        return position;
    });
}


const btnDialogBaterPonto = document.getElementById("btn-dialog-bater-ponto");
btnDialogBaterPonto.addEventListener("click", () => {

    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": getCurrentPosition(),
        "id": 1,
        "tipo": document.getElementById("tipos-ponto").value
    }

    console.log(ponto);

    saveRegisterLocalStorage(JSON.stringify(ponto));

    dialogPonto.close();

    // TO-DO:
    // Fechar o dialog ao bater ponto e apresentar, de alguma forma
    // uma confirmação (ou não) para o usuário
});


function saveRegisterLocalStorage(register) {
    // TO-DO:
    // salvar array de objetos
    localStorage.setItem("register", register);
}


function register() {
    dialogPonto.showModal();
}

function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    // TO-DO:
    // Considerar os métodos abaixo para incluir zeros em numeros < 10
    // padStart()
    // slice()
    // formatos de hora considerando o locale do usuário
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}


function getCurrentDate() {
    // TO-DO:
    // Alterar a solução para considerar padStart ou slice
    // Considerar formatos diferentes da data, conforme localização
    // do usuário dd/mm/aaaa, mm/dd/aaaa, aaaa/mm/dd, aaaa.mm.dd
    // Verificar se no Date() há algum método que possa auxiliar
    // locale
    const date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + (month + 1)
    }
    return day + "/" + month + "/" + date.getFullYear();
}

function printCurrentHour() {
    horaMinSeg.textContent = getCurrentHour();
}


setInterval(printCurrentHour, 1000);