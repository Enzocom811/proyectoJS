export class Producto {
    constructor(nombre, precio, imagen, id, descripcion){

        this.imagen = imagen,
        this.nombre = nombre,
        this.id = id,
        this.precio = precio,
        this.descripcion = descripcion,
        this.cantidad = 0
        
    }

    sumarCantidad(){
        return this.cantidad++
    }
}