let refs = [];
let btns = [];
let btns_volver = document.querySelectorAll(".back-arrow");

window.onload = init;

function init() {
    refs["splash"] = document.getElementById("splash");
    refs["home"] = document.getElementById("home");
    refs["reservar"] = document.getElementById("reservar");
    refs["karaoke"] = document.getElementById("karaoke");
    refs["pedido"] = document.getElementById("pedido");


    btns["btn_reservar"] = document.getElementById("btn_reservar");
    btns["btn_karaoke"] = document.getElementById("btn_karaoke");
    btns["btn_pedido"] = document.getElementById("btn_pedido");


    asignarEventosMenu();
    asignarVolver();

    setTimeout(() => {
        cargarSeccion("home");
    }, 3000);
}

function asignarVolver() {
    for (let i = 0; i < btns_volver.length; i++) {
        btns_volver[i].addEventListener("click", () => {
            cargarSeccion("home");
        });
    }
}

function asignarEventosMenu() {
    btns["btn_reservar"].addEventListener("click", cambiarSeccion);
    btns["btn_karaoke"].addEventListener("click", cambiarSeccion);
    btns["btn_pedido"].addEventListener("click", cambiarSeccion);
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

