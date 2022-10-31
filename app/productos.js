import { eventoAgregarProducto, eventoInput, generarCards, getRequest } from "./funciones.js"
import { arrayProductos, } from "./variables.js"

eventoAgregarProducto()

// Programa
document.addEventListener("DOMContentLoaded", async () => {
    await getRequest()
    generarCards(arrayProductos)
    eventoInput()
})




