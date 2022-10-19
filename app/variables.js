// Variable globales
export let contenedorProductos = document.querySelector("#contenedorProductos")
export let search = document.querySelector ("#search")

export const arrayProductos = JSON.parse(localStorage.getItem("arrayProductos")) || []
export const arrayCarrito = /* JSON.parse(getItem("carrito")) || */ [];