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
                productos: await categoria.productos().where('active', 1).fetch()
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
            let productos = await Producto.query()
                .where('store_id', idTienda)
                .fetch()

            return response.json({
                status: 200,
                productos: productos
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
            let productos = await Producto.query()
                .where('active', 1)
                .where('store_id', idTienda)
                .fetch()

            return response.json({
                status: 200,
                productos: productos
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
        const idTienda = request.params.idTienda
        const idCategoria = request.params.idCategoria

        try {
            let categoria = await Categoria.findOrFail(idCategoria)

            return response.json({
                status: 200,
                productos: await categoria.productos()
                    .where('active', 1)
                    .where('store_id', idTienda)
                    .fetch()
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

    async store({ request, response }) {
        const producto = request.body

        let newProducto = new Producto()
        newProducto.name = producto.name
        newProducto.reference = producto.reference
        newProducto.price = producto.price
        newProducto.description = producto.description
        newProducto.image_url = producto.image_url
        newProducto.customizable = producto.customizable
        newProducto.active = producto.active

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

            producto.name = productoU.name
            producto.reference = productoU.reference
            producto.price = productoU.price
            producto.description = productoU.description
            producto.image_url = productoU.image_url
            producto.customizable = productoU.customizable
            producto.active = productoU.active

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
