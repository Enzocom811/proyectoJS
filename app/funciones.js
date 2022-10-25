import { Producto } from "./classProducto.js";
import { arrayProductos,arrayCarrito, search, contenedorProductos  } from "./variables.js";




// Funciones

export const getRequest = async () => {
    let req = await fetch ("../productos.json",)

    let response = await req.json()

    for (const el of response) {
        arrayProductos.push(el)
    }

    localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos))

    /* generarCards(arrayProductos) */
}

export const generarCards = (array) => {
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

        eventoAgregarProducto()
    })
}

export const eventoAgregarProducto = () =>{
    let btns = document.querySelectorAll(".btn")
    for (const btn of btns) {
        btn.addEventListener("click", (event) =>{ 
            let id = event.target.attributes[1].value;
            console.log(id);
            let existe = arrayCarrito.findIndex(  el => el.id == id)
            console.log(existe);
            if ( existe != -1) {
                //si existe le sumamos uno a la cantidad
                let producto = arrayCarrito[existe]
                console.log("entré al if");
                producto.sumarCantidad()
                console.log(arrayCarrito);
            }
            else{ //instanciar la clase
                console.log("entré al else");
            // consulta en el array de productos y encuentra la coincidencia
            let resultado = arrayProductos.find(el => el.id == id);
            //console.log(resultado);
            let producto = new Producto(resultado.nombre, resultado.precio, resultado.imagen, resultado.id, resultado.descripcion)
            producto.sumarCantidad()
            arrayCarrito.push(producto)
            console.log(arrayCarrito);
            }

            localStorage.setItem("carrito", JSON.stringify(arrayCarrito))
        })
        
    }
}

export const eventoInput = () =>{
    search.addEventListener("input", (event) =>{
        //console.log(event.target.value);
        contenedorProductos.innerHTML = ""
        let resultado = arrayProductos.filter(el => el.nombre.toLowerCase().includes(event.target.value.toLowerCase()));
        console.log(resultado);
        if(resultado.length > 0 ){
            generarCards(resultado)
        }else{
            contenedorProductos.innerHTML = `<h3 class="no-encuentra">No se encontraron resultados</h3>`
        }
    })
}

export const generarCarrito = (array) =>{
    array.forEach( element => {
        let {imagen, nombre, descripcion, cantidad, precio} = element;
        contenedorProductos.innerHTML += `
        <section class="h-100" style="background-color: E6EFEE;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-10">
    
                    <div class="card rounded-1">
                        <div class="card-body p-4">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-md-2 col-lg-2 col-xl-2">
                                    <img src=${imagen}
                                        class="img-fluid rounded-3" alt="image">
                                </div>
                                <div class="col-md-3 col-lg-3 col-xl-3">
                                    <p class="lead fw-normal">${nombre}</p>
                                    <p><span class="text-muted">${descripcion}</span>
                                    </p>
                                </div>
                                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <button class="btn btn-link px-2"
                                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                        <i class="fas fa-minus"></i>
                                    </button>
    
                                    <input id="form1" min="0" name="quantity" value=${cantidad} type="number"
                                        class="form-control form-control-sm" />
    
                                    <button class="btn btn-link px-2"
                                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h5 class="mb-0">$${precio}</h5>
                                </div>
                                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                    <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </section>
        `

    });
}