/*el instructor quito esta parte del codigo de la función con la finalidad de volver más paractico el codigo y no tener que estar utilizando el ~addEventListener~ cada vez que se requiera hacer una validacion.
En su lugar, esta utilizando un data attribute para hacer el enlace con el campo de fecha.

const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener('blur', (evento) => {
    validarNacimiento(evento.target);
})*/

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores =[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío"
    },

    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },

    password: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Entre 6 y 12 caracteres, mínimo una letra minúscula, una letra mayúscula, un número entre 0-9, No caracteres especiales"
    },

    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años"
    },

    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 dígitos",
    },

    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
    },

    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres",
    },

    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 4 a 20 caracteres",
    },
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) =>{
        if (input.validity[error]){
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años"
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    
    return diferenciaFechas <= fechaActual;
}