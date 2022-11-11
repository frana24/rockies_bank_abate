// users

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



// convertor
const APIKEY = '81ea9635ac434f8442e2d309';

const desplegable = document.querySelectorAll('form select'),
    monedaInicial = document.querySelector('#inicial select'),
    monedaFinal = document.querySelector('#monedaFinal'),
    btnConvertir = document.querySelector('#btnConversion'),
    monto = document.querySelector('#monto'),
    conversionTxt = document.querySelector('#conversionTxt'),
    btnInvertirMoneda = document.querySelector('#icono');

const crearSelectsMonedas = async () => {
    const respuesta = await fetch('../json/data.json');
    const dataJson = await respuesta.json();

    desplegable.forEach((element, index) => {
        for (const item of dataJson) {
            let monedaPredet = (index == 0) ? ((item.moneda == 'ARS') ? 'selected' : '') : ((item.moneda == 'USD') ? 'selected' : '');
            let optionHTML = `<option value="${item.moneda}" ${monedaPredet}>${item.moneda}</option>`;
            element.insertAdjacentHTML('beforeend', optionHTML);

        }

        element.addEventListener('change', e => {
            mostrarBandera(e.target);
        })
    });
}

crearSelectsMonedas();

const mostrarBandera = async (element) => {
    const respuesta = await fetch('../json/data.json');
    const dataJson = await respuesta.json();

    for (const item of dataJson) {
        if (item.moneda == element.value) {
            let imagen = element.parentElement.querySelector('img');
            imagen.src = `https://www.countryflagsapi.com/png/${item.pais}`;
        }

    }
}

function obtenerTasaCambio() {
    let montoVal = monto.value;
    if (montoVal == '' || montoVal == '0') {
        monto.value = '1';
        montoVal = 1;
    }

    conversionTxt.innerText = 'Getting information...';


    const URL = `https://v6.exchangerate-api.com/v6/${APIKEY}/latest/${monedaInicial.value}`;



    fetch(URL)
        .then(response => response.json())
        .then(result => {
            console.log(result.conversion_rates);
            let tasaConversion = result.conversion_rates[monedaFinal.value];
            let resultado = (montoVal * tasaConversion).toFixed(2);
            conversionTxt.innerText = `${montoVal} ${monedaInicial.value} = ${resultado} ${monedaFinal.value}`;
        }).catch(() => {
            conversionTxt.innerText = 'Something went wrong';
        });
}

async function cambiar() {
    let montoVal = monto.value;
    if (montoVal == '' || montoVal == '0') {
        monto.value = '1';
        montoVal = 1;
    }
    conversionTxt.innerText = 'Getting information...';
    const URL = `https://v6.exchangerate-api.com/v6/${APIKEY}/latest/${monedaInicial.value}`;

    try {
        const respuesta = await fetch(URL);
        const data = await respuesta.json();
        let tasaConversion = data.conversion_rates[monedaFinal.value];
        let resultado = (montoVal * tasaConversion).toFixed(2);
        conversionTxt.innerText = `${montoVal} ${monedaInicial.value} = ${resultado} ${monedaFinal.value}`;

    } catch (e) {
        conversionTxt.innerText = 'Something went wrong';

    }

}


window.onload = () => {

    cambiar();
}

btnConvertir.addEventListener('click', (e) => {
    e.preventDefault();
    cambiar();
})

btnInvertirMoneda.addEventListener('click', () => {
    let temp = monedaInicial.value;
    monedaInicial.value = monedaFinal.value;
    monedaFinal.value = temp;
    mostrarBandera(monedaInicial);
    mostrarBandera(monedaFinal);
    cambiar();
})

// prestamo

function gen_table(){
    document.getElementById("tab").innerHTML="";
    let n=Number(document.getElementById("capital").value);
    let n2=Number(document.getElementById("couta").value);
    let n3=Number(document.getElementById("interes").value);
    if(n>0){   
        for(i=1;i<=n2;i++){
            ca=n/n2;
            d1=ca.toFixed(2);
            i2=((n*n3)/100)/n2;
            d2=i2.toFixed(2);
            r=ca+i2;
            d3=r.toFixed(2);
            document.getElementById("tab").innerHTML=document.getElementById("tab").innerHTML+
                    `<tr>
                        <td> ${i}</td>
                        <td> ${d1}</td>
                        <td> ${d2}</td>
                        <td> ${d3}</td>
                    </tr>`;
        }
        n1=n.toFixed(2);
        t_i=i2*n2;
        d4=t_i.toFixed(2);
        t_p=r*n2;
        d5=t_p.toFixed(2);
        document.getElementById("t1").innerHTML=n1;
        document.getElementById("t2").innerHTML=d4;
        document.getElementById("t3").innerHTML=d5;        
    }else{
        alert("Need to enter a number");
    }
}


// carga

window.onload = function(){
    let contenedor = document.getElementById('contenedor_carga');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';
}

