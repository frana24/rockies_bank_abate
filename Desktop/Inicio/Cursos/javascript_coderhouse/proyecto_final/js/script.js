// let user = prompt ("Enter your username: ");


// let passSaved = "fran";


// function login() {
//     let enter = false;

//     for (let i=3; i>0 ; i--) {
//         let passUser = prompt ("Enter your password: ");
//         if (passSaved === passUser) {
//             alert ('Hi' + " " + user + ' ' + 'Welcome to RockiesBank!')
//             enter = true;
//             break;
//         }
//         else {
//             alert ("You enter a wrong password.");
//         }

//     }
//     return enter;
// }



// if (login ()){

//     let score = parseInt (450);

//     let option = prompt ("Choose the loan you are interested in: \n1 - Personal Loan \n2 - Mortgage Loan \nPress x to return to homepage");

//     while (option !="X" && option !="x"){
//         switch (option) {
//             case "1":
//                 if (score >= 400){
//                     alert ("You are eligible to apply for a Personal Loan, please present yourself in the bank with your id.");
//                 }else {
//                     alert ("You do not have enough score to apply for a Personal Loan")
//                 }
//                 break;
//             case "2":
//                 if (score >= 500){
//                     alert ("You are eligible to apply for a Mortgage Loan, please present yourself in the bank with your id.");
//                 }else {
//                     alert ("You do not have enough score to apply for a Mortgage Loan")
//                 }
//                 break;
//             default:
//                 alert ("You choose a wrong option")
//                 break;
//         }
//         option = prompt ("Choose the loan you are interested in: \n1 - Personal Loan \n2 - Mortgage Loan \nPress x to return to homepage");

//     }
// }    
// else {
//         alert("Your account has been blocked");
//     }



// alert ("Thank you for choosing Rockies Bank!");

// alert ("Next, you will have the possibility to see the different alternatives available depending on the sector for which you receive your salary");

// class alternative{
//     constructor(sector,months,loan,id){
//         this.sector = sector;
//         this.months = parseInt(months);
//         this.loan = loan;
//         this.id = id;
//     }
//     asignarId(array){
//         this.id = array.lenght;
//     }
// }

// const loans =[
//     new alternative('Anses one year', 12, 'Personal',1),
//     new alternative('Anses two years', 24, 'Personal',2),
//     new alternative('Anses three years', 36, 'Mortgage',3),
//     new alternative('Anses four years', 48, 'Mortgage',4),
//     new alternative('Private Sector one year', 12, 'Personal',5),
//     new alternative('Private Sector two years', 24, 'Personal',6),
//     new alternative('Private Sector three years', 36, 'Mortgage',7),
//     new alternative('Public Sector one year', 12, 'Personal',8),
//     new alternative('Public Sector two years', 24, 'Personal',9),
//     new alternative('Public Sector three years', 36, 'Mortgage',10),
//     new alternative('Public Sector four years', 48, 'Mortgage',11),
//     new alternative('Public Sector five years', 60, 'Mortgage',12),
//     new alternative('IPS one year', 12, 'Personal',13),
//     new alternative('IPS two years', 24, 'Personal',14),
//     new alternative('IPS three years', 36, 'Mortgage',15),
//     new alternative('IPS four years', 48, 'Mortgage',16)
// ]

// console.log (loans);

// let proceed = true;

// while (proceed) {
//     let enter = prompt ("Please enter the name of the sector you belong to where you receive your income, the number of months you wish to apply for the loan and the type of loan, separated by (/). Enter x to finish");

//     if (enter.toUpperCase ()== 'X'){
//         proceed = false;
//         break;
//     }

//     let data= enter.split('/');

//     const Alternative = new alternative (data[0],data[1],data[2]);
//     loans.push (Alternative);
//     Alternative.asignarId(loans);
//     console.log (loans);    

// }

// let criterio = prompt('Choose the criteria you want to see the available loans:\n1 - Sector (A to Z) \n2 - Number of months');

// function ordenar(criterio, array) {
//     let arrayOrdenado = array.slice(0);


//     switch (criterio) {
//         case '1':
//             return arrayOrdenado.sort((a, b) => a.sector - b.sector);
//         case '2':
//             return arrayOrdenado.sort((a, b) => a.months - b.months);
//         default:
//             alert('You entered an incorrect option');
//             break;
//     }
// }

// function crearStringResultado(array){
//     let info = '';

//     array.forEach(elemento=>{
//         info += 'Sector: ' + elemento.sector + '\nMonths: ' + elemento.months + '\nType of loan: ' + elemento.loan + '\n\n'
//     })

//     return info;
// }

// alert(crearStringResultado(ordenar(criterio,loans)));

// let sectorChoose = prompt ('Write the sector you want to be displayed');

// const filter = loans.filter ((alternative)=>alternative.sector.toLowerCase().includes(sectorChoose.toLowerCase()))

// if (filter.lenght==0){
//     alert ('We are sorry. We do not have that sector in the system');
// }else{
//     const show=filter.map((alternative)=>alternative.sector)
//     alert('The sector that matches what is requested is:\n-'+ show.join('\n- '));
// }

const users = [{
    nombre: 'Jessica',
    mail: 'jess_wright@mail.com',
    pass: 'Jess23'
},
{
    nombre: 'Marcela',
    mail: 'marce_wrong@mail.com',
    pass: 'Marce05'
},
{
    nombre: 'Mario',
    mail: 'pocho@mail.com',
    pass: 'Pocho18'
},
{
    nombre: 'Celina',
    mail: 'celi35@mail.com',
    pass: 'Celi05'
}]


const cards = [{
    name: 'Visa',
    credit: 2000,
    points: 10000,
    img: '../images/visa.jpg'
}, {
    name: 'MasterCard',
    credit: 1000,
    points: 5000,
    img: '../images/mastercard.jpg'
}, {
    name: 'American Express',
    credit: 4000,
    points: 20000,
    img: '../images/american.jpg'
}]

const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    remember = document.getElementById('remember'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');

function validUsuario(userssDB, user, pass) {
    let find = userssDB.find((userDB) => userDB.mail == user);

    if (typeof find === 'undefined') {
        return false;
    } else {
        if (find.pass != pass) {
            return false;
        } else {
            return find;
        }
    }
}

function saveData(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }
    storage.setItem('usuario', JSON.stringify(usuario));
}


function saludar(usuario) {
    nombreUsuario.innerHTML = `Welcome, <span>${usuario.name}</span>`
}

function deleteData() {
    localStorage.clear();
    sessionStorage.clear();
}

function recoverUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}

function isLoged(usuario) {
    if (usuario) {
        saludar(usuario);
        showInfoCard(cards);
        showInfo(toggles, 'd-none');
    }
}

// log

function showInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}


function showInfoCard(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardCard" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="nameCard">Name: ${element.nombre}</h3>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoCard">
                <div class="card-body">
                    <p class="card-text" id="creditCard">Credit: ${element.credit}dolars</p>
                    <p class="card-text" id="pointsCard">Points: ${element.points}pts</p>
                </div>
            </div>`;
        contTarjetas.innerHTML += html;
    });
}

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    if (!mailLogin.value || !passLogin.value) {
        alert('Every place is requeired')
    } else {
        let data = validUsuario(users, mailLogin.value, passLogin.value)
        if (!data) {
            alert('User and/or pass wrong');
        } else {
            if (remember.checked) {
                saveData(data, localStorage);
                saludar(recoverUsuario(localStorage));
            } else {
                saveData(data, sessionStorage);
                saludar(recoverUsuario(sessionStorage));
            }
            modal.hide();
            showInfoCard(cards);
            showInfo(toggles, 'd-none');
        }
    }
})

btnLogout.addEventListener('click', () => {
    deleteData();
    showInfo(toggles, 'd-none');
});

window.onload = () => isLoged(recoverUsuario(localStorage));

