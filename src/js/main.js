let refs = [];
let btns = [];
let pedidos = [];
//let btns_volver = document.querySelectorAll(".back-arrow");

window.onload = init;

function init() {
    refs["splash"] = document.getElementById("splash");
    refs["home"] = document.getElementById("home");
    refs["reservar"] = document.getElementById("reservar");
    refs["karaoke"] = document.getElementById("karaoke");
    refs["pedido"] = document.getElementById("pedido");
    refs["karaoke2"] = document.getElementById("karaoke2");
    refs["canciones"] = document.getElementById("canciones");
    refs["turno"] = document.getElementById("turno");

    btns["btn_reservar"] = document.getElementById("btn_reservar");
    btns["btn_karaoke"] = document.getElementById("btn_karaoke");
    btns["btn_pedido"] = document.getElementById("btn_pedido");
    btns["btn_karaoke2"] = document.getElementById("btn_karaoke2");
    btns["btn_canciones"] = document.getElementById("btn_canciones");
    btns["btn_turno"] = document.getElementById("btn_turno");



    asignarEventosMenu();
    mostrarContenido('comida');
    //asignarVolver();

    setTimeout(() => {
        cargarSeccion("home");
    }, 500);
}

// function asignarVolver() {
//     for (let i = 0; i < btns_volver.length; i++) {
//         btns_volver[i].addEventListener("click", () => {
//             cargarSeccion("home");
//         });
//     }
// }

function asignarEventosMenu() {
    btns["btn_reservar"].addEventListener("click", cambiarSeccion);
    btns["btn_karaoke"].addEventListener("click", cambiarSeccion);
    btns["btn_pedido"].addEventListener("click", cambiarSeccion);
    btns["btn_karaoke2"].addEventListener("click", cambiarSeccion);
    btns["btn_canciones"].addEventListener("click", cambiarSeccion);
    btns["btn_turno"].addEventListener("click", cambiarSeccion);
}

function ocultar() {
    for (let key in refs) {
        refs[key].classList.add("ocultar");
    }
}

function cambiarSeccion(e) {
    let seccion = e.target.id.split("_")[1];
    cargarSeccion(seccion);
}

function cargarSeccion(seccion) {
    ocultar();
    refs[seccion].classList.remove("ocultar");
    refs[seccion].classList.add("animate__animated", "animate__fadeIn");
}

function restar(inputId) {
    const input = document.getElementById(inputId);
    let value = parseInt(input.value);
    if (value > parseInt(input.min)) {
        value--;
        input.value = value;
    }
}

function sumar(inputId) {
    const input = document.getElementById(inputId);
    let value = parseInt(input.value);
    if (value < parseInt(input.max)) {
        value++;
        input.value = value;
    }
}


function guardarReserva() {
    const nombre = document.getElementById("nombre_completo").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const celular = document.getElementById("celular").value;
    const cantidadPersonas = document.getElementById("numero_personas").value;

    const reserva = {
        nombre: nombre,
        fecha: fecha,
        hora: hora,
        celular: celular,
        cantidadPersonas: cantidadPersonas
    };
    console.log(reserva);

    localStorage.setItem("reserva", JSON.stringify(reserva));

    Swal.fire({
        title: '¡Reserva guardada!',
        text: 'Tu reserva se ha guardado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'boton'
        }
    });

    document.getElementById("nombre_completo").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("numero_personas").value = 1;
    cargarSeccion("home");
}

function mostrarContenido(tipo) {
    const contenidos = document.querySelectorAll('.tab-content');
    contenidos.forEach(contenido => {
        contenido.classList.add('ocultar');
        contenido.classList.remove('mostrar');
    });

    const botones = document.querySelectorAll('.tab-button');
    botones.forEach(boton => {
        boton.classList.remove('active');
    });

    const contenidoSeleccionado = document.getElementById(`contenido-${tipo}`);
    if (contenidoSeleccionado) {
        contenidoSeleccionado.classList.remove('ocultar');
        contenidoSeleccionado.classList.add('mostrar');
    }
    
    const botonSeleccionado = Array.from(botones).find(boton => boton.textContent.toLowerCase() === tipo);
    if (botonSeleccionado) {
        botonSeleccionado.classList.add('active');
    }
}

function agregarItem(nombrePlato, desc, precio, inputId) {
    const cantidadInput = document.getElementById(inputId);
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad > 0) {
        const item = {
            nombre: nombrePlato,
            descripcion: desc,
            precio: precio,
            cantidad: cantidad
        };

        pedidos.push(item);
        console.log(pedidos);
        cantidadInput.value = 0;

        Swal.fire({
            title: '¡Añadido a la cesta!',
            text: `Has añadido ${cantidad} de ${nombrePlato} a la cesta.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        });
    } else {
        Swal.fire({
            title: 'Cantidad inválida',
            text: 'Por favor, selecciona una cantidad mayor a 0.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        });
    }
}