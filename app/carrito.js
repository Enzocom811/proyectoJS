//import { arrayCarrito, arrayProductos } from "./variables.js"

import { /* generarBotones, */ generarCarrito} from "./funciones.js";


let containerProductos = document.querySelector("#contenedorProductos")

let carrito = {
    productos: JSON.parse(localStorage.getItem("carrito")),

    total: () => {
        //logica para calcular el total
        let array = carrito.productos;
        let resultado = array.reduce( (acumulador, el ) => acumulador + Number(el.precio) * Number(el.cantidad), 0)
        console.log(resultado);

        document.querySelector("#totalCompra").innerHTML += `
        <div class="container h-100 py-0">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-10">
                <div class="card">
                    <div class="card-body ">
                        <h5 class="mb-0 d-flex justify-content-end">Total: $${resultado}</h5>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `
    },

    generarHtml: () => {
        let array = carrito.productos;
        generarCarrito(array)
            generarBotones()
        console.log(array);
        if (array.length > 0) {
            
        }else /* if(array.length = 0) */{
            containerProductos.innerHTML += `<h3>El carrito está vacio</h3>`
            
        }
        /* esto no andaaaaa */
        
    }
    

}

console.log(carrito.productos);
carrito.total()
carrito.generarHtml()