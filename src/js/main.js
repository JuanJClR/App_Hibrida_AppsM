let refs = [];
let btns = [];
let reservas = [];
let pedidos = [];
let cesta = [];
let seccionActual = "";
let edadVerificada = false; // Nueva variable para controlar si la edad ya ha sido verificada

window.onload = function() {
    init();
};

function verificarEdad() {
    if (edadVerificada) return; // Si ya se verificó la edad, no mostrar el modal de nuevo

    Swal.fire({
        title: 'Verificación de edad',
        text: '¿Eres mayor de 18 años?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        customClass: {
            confirmButton: 'boton',
            cancelButton: 'boton'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            edadVerificada = true; // Marcar la edad como verificada
            Swal.fire({
                title: 'Acceso permitido',
                text: 'Bienvenido al karaoke.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'boton'
                }
            });
        } else {
            Swal.fire({
                title: 'Acceso denegado',
                text: 'Debes ser mayor de 18 años para acceder.',
                icon: 'error',
                confirmButtonText: 'Entendido',
                customClass: {
                    confirmButton: 'boton'
                }
            }).then(() => {
                window.location.href = 'https://www.google.com'; // Redirigir a otra página
            });
        }
    });
}

function init() {
    refs["splash"] = document.getElementById("splash");
    refs["home"] = document.getElementById("home");
    refs["reservar"] = document.getElementById("reservar");
    refs["karaoke"] = document.getElementById("karaoke");
    refs["pedido"] = document.getElementById("pedido");
    refs["karaoke2"] = document.getElementById("karaoke2");
    refs["canciones"] = document.getElementById("canciones");
    refs["turno"] = document.getElementById("turno");
    refs["atras"] = document.querySelector(".atras");
    refs["carrito"] = document.getElementById("carrito");

    btns["btn_reservar"] = document.getElementById("btn_reservar");
    btns["btn_karaoke"] = document.getElementById("btn_karaoke");
    btns["btn_pedido"] = document.getElementById("btn_pedido");
    btns["btn_karaoke2"] = document.getElementById("btn_karaoke2");
    btns["btn_canciones"] = document.getElementById("btn_canciones");
    btns["btn_turno"] = document.getElementById("btn_turno");
    btns["btn_carrito"] = document.getElementById("btn_carrito");

    asignarEventosMenu();
    mostrarContenido('comida');
    cesta = [];

    setTimeout(() => {
        cargarSeccion("home"); // Cambia la sección a "home"
    }, 500);
}

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
    seccionActual = seccion;

    if (seccion === "home" || seccion === "splash") {
        refs["atras"].style.display = "none";
        if (!edadVerificada) { // Solo verificar la edad si aún no se ha hecho
            verificarEdad();
        }
    } else {
        refs["atras"].style.display = "block";
    }
}

function irAtras() {
    console.log(seccionActual);
    if (seccionActual === "karaoke2") {
        cargarSeccion("karaoke");
        seccionActual = "karaoke";
    } else if (seccionActual === "canciones") {
        cargarSeccion("karaoke");
        seccionActual = "karaoke";
    } else if (seccionActual === "turno") {
        cargarSeccion("karaoke2");
        seccionActual = "karaoke2";
    } else if (seccionActual === "carrito") {
        cargarSeccion("pedido");
        seccionActual = "pedido";
    } else {
        cargarSeccion("home");
    }
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
    reservas.push(reserva);

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
        // Buscar el item en la cesta por nombre
        let itemExistente = null;

        for (let i = 0; i < cesta.length; i++) {
            if (cesta[i].nombre === nombrePlato) {
                itemExistente = cesta[i];
                break;
            }
        }

        if (itemExistente) {
            // Si el item ya existe, sumar la cantidad
            itemExistente.cantidad += cantidad;
            Swal.fire({
                title: 'Cantidad actualizada',
                text: `Se han añadido ${cantidad} más a ${nombrePlato} en la cesta.`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'boton'
                }
            });
        } else {
            // Si el item no existe, agregarlo a la cesta
            const item = {
                nombre: nombrePlato,
                descripcion: desc,
                precio: precio,
                cantidad: cantidad
            };

            cesta.push(item);
            Swal.fire({
                title: '¡Añadido a la cesta!',
                text: `Has añadido ${cantidad} de ${nombrePlato} a la cesta.`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'boton'
                }
            });
        }

        cantidadInput.value = 0; // Resetear la cantidad a 0
        console.log(cesta); // Mostrar la cesta actualizada en la consola

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



function actualizarCarrito() {
    const carritoItemsDiv = document.getElementById('carrito-items');
    carritoItemsDiv.innerHTML = ''; // Limpiar el contenido anterior

    let total = 0;

    cesta.forEach((item, index) => {
        // Crear la estructura HTML según la que has proporcionado
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');

        const nombre = document.createElement('h3');
        nombre.textContent = item.nombre;
        itemDiv.appendChild(nombre);

        const descripcion = document.createElement('p');
        descripcion.textContent = item.descripcion;
        itemDiv.appendChild(descripcion);

        const precio = document.createElement('h3');
        precio.textContent = `$${item.precio.toLocaleString()}`;
        itemDiv.appendChild(precio);

        const cantidadDiv = document.createElement('div');

        const restarBtn = document.createElement('button');
        restarBtn.type = 'button';
        restarBtn.textContent = '-';
        restarBtn.classList.add('btn-add-menu');
        restarBtn.id = `menos_${index}`;
        restarBtn.onclick = () => restarCantidad(index);
        cantidadDiv.appendChild(restarBtn);

        const cantidadInput = document.createElement('input');
        cantidadInput.classList.add('cantidad');
        cantidadInput.id = `numero_${index}`;
        cantidadInput.type = 'number';
        cantidadInput.value = item.cantidad;
        cantidadInput.min = 1;
        cantidadInput.max = 10;
        cantidadDiv.appendChild(cantidadInput);

        const sumarBtn = document.createElement('button');
        sumarBtn.type = 'button';
        sumarBtn.textContent = '+';
        sumarBtn.classList.add('btn-add-menu');
        sumarBtn.id = `mas_${index}`;
        sumarBtn.onclick = () => sumarCantidad(index);
        cantidadDiv.appendChild(sumarBtn);

        itemDiv.appendChild(cantidadDiv);

        // Botón para borrar el item
        const borrarBtn = document.createElement('button');
        borrarBtn.classList.add('agregar');
        borrarBtn.textContent = 'Borrar';
        borrarBtn.onclick = () => borrarItem(index);
        itemDiv.appendChild(borrarBtn);

        // Añadir el ítem al contenedor principal
        carritoItemsDiv.appendChild(itemDiv);

        total += item.precio * item.cantidad;
                
    });

    document.getElementById('carrito-total').textContent = `$${total.toLocaleString()}`;
}

function restarCantidad(index) {
    if (cesta[index].cantidad > 1) {
        cesta[index].cantidad--;
        actualizarCarrito();
    }
}

function sumarCantidad(index) {
    if (cesta[index].cantidad < 10) {
        cesta[index].cantidad++;
        actualizarCarrito();
    }
}

function borrarItem(index) {
    cesta.splice(index, 1);
    actualizarCarrito();
}

function realizarPedido() {
    const mesa = document.getElementById('mesa').value;

    // Validar que el número de mesa no esté vacío, sea un número, y esté entre 1 y 20
    if (mesa === '' || isNaN(mesa) || mesa < 1 || mesa > 20) {
        Swal.fire({
            title: 'Número de mesa inválido',
            text: 'Por favor, ingrese un número de mesa entre 1 y 20.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        });
        return; // Detener la ejecución si la validación falla
    }

    if (cesta.length === 0) {
        Swal.fire({
            title: 'No hay productos',
            text: 'Por favor, agrega productos al carrito antes de realizar el pedido.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        });
    } else {
        const pedido = {
            mesa: mesa,
            productos: [...cesta], // Copia de la cesta actual
            total: cesta.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
        };

        pedidos.push(pedido);
        cesta = []; // Vaciar la cesta después de realizar el pedido
        actualizarCarrito();

        Swal.fire({
            title: 'Pedido realizado',
            text: 'Su pedido ha sido enviado a la cocina.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        }).then(() => {
            cargarSeccion('home'); // Cambiar a la sección de home
        });
    }
}


let canciones = []; // Array global para almacenar las canciones

function agregarCancion() {
    const tituloInput = document.getElementById('titulo');
    const artistaInput = document.getElementById('artista');
    
    const titulo = tituloInput.value.trim();
    const artista = artistaInput.value.trim();

    if (titulo === "" || artista === "") {
        Swal.fire({
            title: 'Error',
            text: 'Se deben llenar ambos campos.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        });
    } else {
        const cancion = {
            titulo: titulo,
            artista: artista
        };

        canciones.push(cancion);

        Swal.fire({
            title: 'Éxito',
            text: 'Canción guardada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        }).then(() => {
            // Limpiar los campos
            tituloInput.value = "";
            artistaInput.value = "";
        });
    }
}

// Variable global para el turno
let turno = false;


function verificarTurno() {
    if (!turno) {
        // Solicitar turno
        Swal.fire({
            title: 'Confirmación',
            text: '¿Deseas solicitar un turno para el karaoke?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                turno = true;
                Swal.fire({
                    title: 'Turno solicitado',
                    text: 'Tu turno ha sido solicitado con éxito.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton: 'boton'
                    }
                });
            }
        });
    } else {
        // Ya tiene un turno
        Swal.fire({
            title: 'Ya tienes un turno',
            text: 'Ya has solicitado un turno para el karaoke.',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        });
    }
}

function verificarTurnoParaVer(e) {
    if (!turno) {
        Swal.fire({
            title: 'No has solicitado un turno',
            text: 'Primero debes solicitar un turno para ver el estado.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        });
        // Prevenir la acción predeterminada (navegación)
        cargarSeccion(karaoke2);
    } else {
        Swal.fire({
            title: 'Estado del turno',
            text: 'Tu turno para el karaoke está confirmado.',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'boton'
            }
        });
    }
}

