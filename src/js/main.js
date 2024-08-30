let refs = [];
let btns = [];
//let btns_volver = document.querySelectorAll(".back-arrow");

window.onload = init;

function init() {
    refs["splash"] = document.getElementById("splash");
    refs["home"] = document.getElementById("home");
    refs["reservar"] = document.getElementById("reservar");
    refs["karaoke"] = document.getElementById("karaoke");
    refs["pedido"] = document.getElementById("pedido");
    refs["karaoke2"] = document.getElementById("karaoke2");

    btns["btn_reservar"] = document.getElementById("btn_reservar");
    btns["btn_karaoke"] = document.getElementById("btn_karaoke");
    btns["btn_pedido"] = document.getElementById("btn_pedido");
    btns["btn_karaoke2"] = document.getElementById("btn_karaoke2");


    asignarEventosMenu();
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

function restar() {
    const input = document.getElementById("numero_personas");
    let value = parseInt(input.value);
    if (value > parseInt(input.min)) {
        value--;
        input.value = value;
    }
}

function sumar() {
    const input = document.getElementById("numero_personas");
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