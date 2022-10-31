import { generarBotones, generarCarrito, generarTotal} from "./funciones.js";
import { arrayCarrito } from "./variables.js";

let contenedorProductos = document.querySelector("#contenedorProductos")


    const generarHtml = () => {
        if(arrayCarrito.length > 0){
        generarCarrito(arrayCarrito) 
        generarTotal(arrayCarrito)
        generarBotones()
        document.getElementById("bag").style.color = 'black';
        }
        else{
            contenedorProductos.innerHTML = `<h3 class="noResult"> El carrito está vacío </h3>`
        }
    }
    
    generarHtml()