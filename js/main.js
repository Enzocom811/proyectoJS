
// Variable locales
let contenedorProductos = document.querySelector("#contenedorProductos")
let search = document.querySelector ("#search")

const arrayProdutos = []
const arrayProductos = []



// Funciones
const getRequest = async () => {
    let req = await fetch ("../productos.json",)

    let response = await req.json()

    for (const el of response) {
        arrayProductos.push(el)
    }

    generarCards(arrayProductos)
}

const generarCards = (array) => {
    array.forEach(element => {
        let {imagen, nombre, id, precio} = element;
        contenedorProductos.innerHTML += `
        <div class="card" style="width: 25em;">
            <img src=${imagen} class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$${precio}</p>
                <div>
                    <button class="btn" data-id=${id}>Agregar</button>
                </div>
            </div>
        </div>
        `
    })
}

document.addEventListener("DOMContentLoaded", getRequest)
generarCards(arrayProductos)