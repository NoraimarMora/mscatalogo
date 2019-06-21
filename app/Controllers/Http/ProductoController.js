'use strict'

const Producto = use('App/Models/Producto')
const Tienda = use('App/Models/Tienda')
const Categoria = use('App/Models/Categoria')

class ProductoController {

    async getAll({ response }) {
        let productos = await Producto.all()

        return response.json({
            status: 200,
            productos: productos
        })
    } 

    async getById({ request, response }){
        const idProducto = request.params.id

        try{
            let producto = await Producto.findOrFail(idProducto)

            return response.json({
                status: 200,
                producto: producto
            })
        } catch(err) {
            if (err.name === 'ModelNotFoundException') {
                return response.json({
                    status: 404,
                    message: "Not found"
                })
            }
        }
    }

    async getFeaturesByProduct({ request, response }) {
        const idProducto = request.params.id

        try{
            let producto = await Producto.findOrFail(idProducto)

            return response.json({
                status: 200,
                caracteristicas: producto.caracteristicas().fetch()
            })
        } catch(err) {
            if (err.name === 'ModelNotFoundException') {
                return response.json({
                    status: 404,
                    message: "Not found"
                })
            }
        }
    }

    async getProductsByCategory({ request, response }) {
        const idCategoria = request.params.idCategoria

        try {
            let categoria = await Categoria.findOrFail(idCategoria)

            return response.json({
                status: 200,
                productos: await categoria.productos().where('activo', 1).fetch()
            })
        } catch(err) {
            if (err.name === 'ModelNotFoundException') {
                return response.json({
                    status: 404,
                    message: "Not found"
                })
            }
        }
    }

    async getProductsByStore({ request, response }) {
        const idTienda = request.params.idTienda

        try {
            let tienda = await Tienda.findOrFail(idTienda)

            return response.json({
                status: 200,
                productos: await tienda.productos().fetch()
            })
        } catch(err) {
            if (err.name === 'ModelNotFoundException') {
                return response.json({
                    status: 404,
                    message: "Not found"
                })
            }
        }
    }

    async getActiveProductsByStore({ request, response }) {
        const idTienda = request.params.idTienda

        try {
            let tienda = await Tienda.findOrFail(idTienda)

            return response.json({
                status: 200,
                productos: await tienda.productos().where('activo', 1).fetch()
            })
        } catch(err) {
            if (err.name === 'ModelNotFoundException') {
                return response.json({
                    status: 404,
                    message: "Not found"
                })
            }
        }
    }

    async getProductsByCategoryAndStore({ request, response }) {
        
    }

    async store({ request, response }) {
        const producto = request.body

        let newProducto = new Producto()
        newProducto.nombre = producto.nombre
        newProducto.referencia = producto.referencia
        newProducto.precio = producto.precio
        newProducto.descripcion = producto.descripcion
        newProducto.image_url = producto.image_url
        newProducto.personalizable = producto.personalizable
        newProducto.activo = producto.activo

        await newProducto.save()

        return response.json({
            status: 200,
            producto: newProducto
        })
    }

    async update({ request, response }) {
        const idProducto = request.params.id
        const productoU = request.body

        try {
            let producto = await Producto.findOrFail(idProducto)

            producto.nombre = productoU.nombre
            producto.referencia = productoU.referencia
            producto.precio = productoU.precio
            producto.descripcion = productoU.descripcion
            producto.image_url = productoU.image_url
            producto.personalizable = productoU.personalizable
            producto.activo = productoU.activo

            await producto.save()

            return response.json({
                status: 200,
                producto: producto
            })
        } catch (err) {
            if (err.name === 'ModelNotFoundException') {
                return response.json({
                    status: 404,
                    message: "Not found"
                })
            }
        }
    }

    async delete({ request, response }) {
        const idProducto = request.params.id

        try {
            let producto = await Producto.findOrFail(idProducto)

            await producto.delete()

            return response.json({
                status: 200,
                message: "Producto eliminado"
            })
        } catch (err) {
            if (err.name === 'ModelNotFoundException') {
                return response.json({
                    status: 404,
                    message: "Not found"
                })
            }
        }
    }

}

module.exports = ProductoController
