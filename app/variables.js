// Variable globales
export let contenedorProductos = document.querySelector("#contenedorProductos")
export let search = document.querySelector ("#search")

export const arrayProductos =  []
export const arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || [];