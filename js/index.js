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

// Quando ele não sera um array ?
let registersLocalStorage = getRegisterLocalStorage();

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

    let typeRegister = document.getElementById("tipos-ponto").value;

    let ponto = {
        "data": getCurrentDate(),
        "hora": getCurrentHour(),
        "localizacao": getCurrentPosition(),
        "id": 1,
        "tipo": typeRegister
    }

    console.log(ponto);

    saveRegisterLocalStorage(ponto);

    localStorage.setItem("lastTypeRegister", typeRegister);
    dialogPonto.close();

    // TO-DO:
    // Fechar o dialog ao bater ponto e apresentar, de alguma forma
    // uma confirmação (ou não) para o usuário
});


function saveRegisterLocalStorage(register) {
    // TO-DO:
    // salvar array de objetos
    registersLocalStorage.push(register) //Array
    localStorage.setItem("register", JSON.stringify(registersLocalStorage));
}


// ESSA FUNÇÃO DEVE RETORNAR SEMPRE UM ARRAY MESMO QUE SEJA VAZIO
function getRegisterLocalStorage () {
    let  registers = localStorage.getItem("register") 
    if (!registers) {
        return [];
    }

    //TO-DO 
    // garantir que sera retornado um array e n uma string
    return JSON.parse(registers);
}

function register() {
    dialogData.textContent = "Data: " + getCurrentDate();
    dialogHora.textContent = "Hora: " + getCurrentHour();
    
    dialogPonto.showModal();
}

function getWeekDay() {
    const date = new Date();
    let days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return days[date.getDay()];
}

function getCurrentHour() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
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

printCurrentHour();
setInterval(printCurrentHour, 1000);