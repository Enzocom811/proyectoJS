export class Producto {
    constructor(nombre, precio, imagen, id, descripcion){

        this.imagen = imagen,
        this.nombre = nombre,
        this.id = id,
        this.precio = precio,
        this.descripcion = descripcion,
        this.cantidad = 0
        
    }

    //metodos sumar cantidad: cada vez que se ejecute este metodo va a sumar uno en la cantidad.

    sumarCantidad(){
        return this.cantidad++
    }
    //restarCantidad(){}
}