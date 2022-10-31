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

}

export const generarCards = (array) => {
    array.forEach(element => {
        let {imagen, nombre, id, precio, descripcion} = element;
        contenedorProductos.innerHTML += `
        <div class="card" style="width: 25em;">
            <img src=${imagen} class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <h6 class="d-flex justify-content-center fw-normal">${descripcion}</h6>
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
            let existe = arrayCarrito.findIndex(  el => el.id == id)
            if ( existe != -1) {
                let producto = arrayCarrito[existe]
                producto.sumarCantidad()
            }
            else{
            let resultado = arrayProductos.find(el => el.id == id);
            let producto = new Producto(resultado.nombre, resultado.precio, resultado.imagen, resultado.id, resultado.descripcion)
            producto.sumarCantidad()
            arrayCarrito.push(producto)
            }

            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })
                Toast.fire({
                icon: 'success',
                iconColor: 'blue',
                title: 'Agregado al carrito'
                })

            localStorage.setItem("carrito", JSON.stringify(arrayCarrito))

            document.getElementById("bag").style.color = 'black'
        })
        
    }
}

export const eventoInput = () =>{
    search.addEventListener("input", (event) =>{
        contenedorProductos.innerHTML = ""
        let resultado = arrayProductos.filter(el => el.nombre.toLowerCase().includes(event.target.value.toLowerCase()));
        if(resultado.length > 0 ){
            generarCards(resultado)
        }else{
            contenedorProductos.innerHTML = `<h3 class="no-encuentra">No se encontraron resultados</h3>`
        }
    })
}

export const generarCarrito = (array) =>{
    array.forEach( element => {
        let {imagen, nombre, descripcion, cantidad, precio, id} = element;
        contenedorProductos.innerHTML += `
        <section class="h-100" style="background-color: E6EFEE;" id=${id}>
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-10 m-0">
    
                    <div class="card rounded-3 m-0 w-100">
                        <div class="card-body p-4  h-100">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-md-2 col-lg-2 col-xl-2">
                                    <img src=${imagen}
                                        class="img-fluid rounded-3" alt="image">
                                </div>
                                <div class="col-md-3 col-lg-3 col-xl-3">
                                    <p class="lead fw-normal fs-5">${nombre}</p>
                                    <p><span class="text-muted"></span>
                                    </p>
                                </div>
                                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <button  class="btn restarCantidad px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                        <i class="fas fa-minus p-1">-</i>
                                    </button>
    
                                    <input id="form1" min="0" name="quantity" value=${cantidad} type="number"
                                        class="form-control form-control-sm" />
    
                                    <button  class="btn sumarCantidad px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                        <i class="fas fa-plus p-0">+</i>
                                    </button>
                                </div>
                                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h5 class="mb-0">$${precio}</h5>
                                </div>
                                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                    <a href="#!" id="eliminar" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
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

export const generarBotones =  ()=>{
    let btnFinalizar = document.querySelector("#btn-finalizarCompra")
    btnFinalizar.innerHTML += `
            <div class="container h-100 py-0">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-10 m-2">
                        <div class="card">
                            <div class="card-body">
                                <button id="btnFinalizar" type="button" class="btn btn-warning btn-block btn-lg w-100">Finalizar compra</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `
    eventoFinalizarCompra()

}


export const eventoFinalizarCompra = () =>{

    const resultado = arrayCarrito.reduce( (acumulador, el ) => acumulador + Number(el.precio) * Number(el.cantidad), 0)

    document.querySelector("#btnFinalizar")
    .addEventListener("click",()=>{
        Swal.fire({
            icon: 'success',
            title: 'Gracias por su compra',
            text: `El importe total de su compra es: $${resultado}`,
            confirmButtonText: 'Aceptar',
        })
        .then(resultado => {
            if (resultado.value) {
                localStorage.clear("carrito");
                window.location = "../index.html"
            }
        });

    })
    
}

export const generarTotal = (array)=> {

    const resultado = array.reduce( (acumulador, el ) => acumulador + Number(el.precio) * Number(el.cantidad), 0)

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
}