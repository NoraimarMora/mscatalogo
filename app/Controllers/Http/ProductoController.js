'use strict'

const Producto = use('App/Models/Producto')
const Marca = use('App/Models/Marca')
const Categoria = use('App/Models/Categoria')

class ProductoController {

    async getAll({ response }) {
        let resp = await Producto.query()
            .with('tienda')
            .with('categorias')
            .with('caracteristicas')
            .fetch()
        let productos = [];

        resp.rows.map((producto) => {
            let tienda = producto.getRelated('tienda')
            let categorias = []
            let caracteristicas = []

            producto.getRelated('categorias').rows.map((categoria) => {
                categorias.push({
                    id: categoria.id,
                    name: categoria.name,
                    description: categoria.description,
                    banner_url: categoria.banner_url,
                    parent: categoria.parent,
                    position: categoria.position,
                    active: categoria.active,
                    date_created: categoria.created_at
                })
            })

            producto.getRelated('caracteristicas').rows.map((caracteristica) => {
                caracteristicas.push({
                    id: caracteristica.id,
                    name: caracteristica.name,
                    impact: caracteristica.$relations.pivot.impact,
                    feature_id: caracteristica.caracteristica_id,
                    date_created: caracteristica.created_at
                })
            })

            productos.push({
                id: producto.id,
                name: producto.name,
                reference: producto.reference,
                price: producto.price,
                description: producto.description,
                image_url: producto.image_url,
                customizable: producto.customizable,
                store_id: producto.tienda_id,
                active: producto.active,
                date_created: producto.created_ad,
                store: {
                    id: tienda.id,
                    name: tienda.name,
                    brand_id: tienda.marca_id,
                    date_created: tienda.created_at
                },
                categories: categorias,
                features: caracteristicas
            })
        })

        return response.json({
            status: 200,
            products: productos
        })
    } 

    async getById({ request, response }){
        const idProducto = request.params.id

        try{
            let resp = await Producto.findOrFail(idProducto)

            await resp.loadMany(['tienda', 'categorias', 'caracteristicas'])

            let tienda = resp.getRelated('tienda')
            let categorias = []
            let caracteristicas = []

            resp.getRelated('categorias').rows.map((categoria) => {
                categorias.push({
                    id: categoria.id,
                    name: categoria.name,
                    description: categoria.description,
                    banner_url: categoria.banner_url,
                    parent: categoria.parent,
                    position: categoria.position,
                    active: categoria.active,
                    date_created: categoria.created_at
                })
            })

            resp.getRelated('caracteristicas').rows.map((caracteristica) => {
                caracteristicas.push({
                    id: caracteristica.id,
                    name: caracteristica.name,
                    impact: caracteristica.$relations.pivot.impact,
                    feature_id: caracteristica.caracteristica_id,
                    date_created: caracteristica.created_at
                })
            })

            let producto = {
                id: resp.id,
                name: resp.name,
                reference: resp.reference,
                price: resp.price,
                description: resp.description,
                image_url: resp.image_url,
                customizable: resp.customizable,
                store_id: resp.tienda_id,
                active: resp.active,
                date_created: resp.created_ad,
                store: {
                    id: tienda.id,
                    name: tienda.name,
                    brand_id: tienda.marca_id,
                    date_created: tienda.created_at
                },
                categories: categorias,
                features: caracteristicas
            }

            return response.json({
                status: 200,
                product: producto
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
            let caracteristicas = []
        
            await producto.load('caracteristicas')

            producto.getRelated('caracteristicas').rows.map((caracteristica) => {
                caracteristicas.push({
                    id: caracteristica.id,
                    name: caracteristica.name,
                    impact: caracteristica.$relations.pivot.impact,
                    feature_id: caracteristica.caracteristica_id,
                    date_created: caracteristica.created_at
                })
            })

            return response.json({
                status: 200,
                feature_values: caracteristicas
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
            
            let resp = await categoria.productos()
                .where('active', 1)
                .with('tienda')
                .with('categorias')
                .with('caracteristicas')
                .fetch()

            let productos = []

            resp.rows.map((producto) => {
                let tienda = producto.getRelated('tienda')
                let categorias = []
                let caracteristicas = []
    
                producto.getRelated('categorias').rows.map((categoria) => {
                    categorias.push({
                        id: categoria.id,
                        name: categoria.name,
                        description: categoria.description,
                        banner_url: categoria.banner_url,
                        parent: categoria.parent,
                        position: categoria.position,
                        active: categoria.active,
                        date_created: categoria.created_at
                    })
                })
    
                producto.getRelated('caracteristicas').rows.map((caracteristica) => {
                    caracteristicas.push({
                        id: caracteristica.id,
                        name: caracteristica.name,
                        impact: caracteristica.$relations.pivot.impact,
                        feature_id: caracteristica.caracteristica_id,
                        date_created: caracteristica.created_at
                    })
                })
    
                productos.push({
                    id: producto.id,
                    name: producto.name,
                    reference: producto.reference,
                    price: producto.price,
                    description: producto.description,
                    image_url: producto.image_url,
                    customizable: producto.customizable,
                    store_id: producto.tienda_id,
                    active: producto.active,
                    date_created: producto.created_ad,
                    store: {
                        id: tienda.id,
                        name: tienda.name,
                        brand_id: tienda.marca_id,
                        date_created: tienda.created_at
                    },
                    categories: categorias,
                    features: caracteristicas
                })
            })

            return response.json({
                status: 200,
                products: productos
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
            let resp = await Producto.query()
                .where('tienda_id', idTienda)
                .with('tienda')
                .with('categorias')
                .with('caracteristicas')
                .fetch()

            let productos = []

            resp.rows.map((producto) => {
                let tienda = producto.getRelated('tienda')
                let categorias = []
                let caracteristicas = []
    
                producto.getRelated('categorias').rows.map((categoria) => {
                    categorias.push({
                        id: categoria.id,
                        name: categoria.name,
                        description: categoria.description,
                        banner_url: categoria.banner_url,
                        parent: categoria.parent,
                        position: categoria.position,
                        active: categoria.active,
                        date_created: categoria.created_at
                    })
                })
    
                producto.getRelated('caracteristicas').rows.map((caracteristica) => {
                    caracteristicas.push({
                        id: caracteristica.id,
                        name: caracteristica.name,
                        impact: caracteristica.$relations.pivot.impact,
                        feature_id: caracteristica.caracteristica_id,
                        date_created: caracteristica.created_at
                    })
                })
    
                productos.push({
                    id: producto.id,
                    name: producto.name,
                    reference: producto.reference,
                    price: producto.price,
                    description: producto.description,
                    image_url: producto.image_url,
                    customizable: producto.customizable,
                    store_id: producto.tienda_id,
                    active: producto.active,
                    date_created: producto.created_ad,
                    store: {
                        id: tienda.id,
                        name: tienda.name,
                        brand_id: tienda.marca_id,
                        date_created: tienda.created_at
                    },
                    categories: categorias,
                    features: caracteristicas
                })
            })

            return response.json({
                status: 200,
                products: productos
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
            let resp = await Producto.query()
                .where('active', 1)
                .where('tienda_id', idTienda)
                .with('tienda')
                .with('categorias')
                .with('caracteristicas')
                .fetch()

            let productos = []

            resp.rows.map((producto) => {
                let tienda = producto.getRelated('tienda')
                let categorias = []
                let caracteristicas = []
    
                producto.getRelated('categorias').rows.map((categoria) => {
                    categorias.push({
                        id: categoria.id,
                        name: categoria.name,
                        description: categoria.description,
                        banner_url: categoria.banner_url,
                        parent: categoria.parent,
                        position: categoria.position,
                        active: categoria.active,
                        date_created: categoria.created_at
                    })
                })
    
                producto.getRelated('caracteristicas').rows.map((caracteristica) => {
                    caracteristicas.push({
                        id: caracteristica.id,
                        name: caracteristica.name,
                        impact: caracteristica.$relations.pivot.impact,
                        feature_id: caracteristica.caracteristica_id,
                        date_created: caracteristica.created_at
                    })
                })
    
                productos.push({
                    id: producto.id,
                    name: producto.name,
                    reference: producto.reference,
                    price: producto.price,
                    description: producto.description,
                    image_url: producto.image_url,
                    customizable: producto.customizable,
                    store_id: producto.tienda_id,
                    active: producto.active,
                    date_created: producto.created_ad,
                    store: {
                        id: tienda.id,
                        name: tienda.name,
                        brand_id: tienda.marca_id,
                        date_created: tienda.created_at
                    },
                    categories: categorias,
                    features: caracteristicas
                })
            })

            return response.json({
                status: 200,
                products: productos
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

            let resp = await categoria.productos()
                .where('active', 1)
                .where('tienda_id', idTienda)
                .with('tienda')
                .with('categorias')
                .with('caracteristicas')
                .fetch()

            let productos = []

            resp.rows.map((producto) => {
                let tienda = producto.getRelated('tienda')
                let categorias = []
                let caracteristicas = []
    
                producto.getRelated('categorias').rows.map((categoria) => {
                    categorias.push({
                        id: categoria.id,
                        name: categoria.name,
                        description: categoria.description,
                        banner_url: categoria.banner_url,
                        parent: categoria.parent,
                        position: categoria.position,
                        active: categoria.active,
                        date_created: categoria.created_at
                    })
                })
    
                producto.getRelated('caracteristicas').rows.map((caracteristica) => {
                    caracteristicas.push({
                        id: caracteristica.id,
                        name: caracteristica.name,
                        impact: caracteristica.$relations.pivot.impact,
                        feature_id: caracteristica.caracteristica_id,
                        date_created: caracteristica.created_at
                    })
                })
    
                productos.push({
                    id: producto.id,
                    name: producto.name,
                    reference: producto.reference,
                    price: producto.price,
                    description: producto.description,
                    image_url: producto.image_url,
                    customizable: producto.customizable,
                    store_id: producto.tienda_id,
                    active: producto.active,
                    date_created: producto.created_ad,
                    store: {
                        id: tienda.id,
                        name: tienda.name,
                        brand_id: tienda.marca_id,
                        date_created: tienda.created_at
                    },
                    categories: categorias,
                    features: caracteristicas
                })
            })

            return response.json({
                status: 200,
                products: productos
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

    async getProductsByBrand({ request, response }) {
        const idMarca = request.params.idMarca

        try {
            let marca = await Marca.findOrFail(idMarca)
            let resp = await marca.productos()
                .with('tienda')
                .with('categorias')
                .with('caracteristicas')
                .fetch()

            let productos = []

            resp.rows.map((producto) => { 
                let tienda = producto.getRelated('tienda')
                let categorias = []
                let caracteristicas = []
    
                producto.getRelated('categorias').rows.map((categoria) => {
                    categorias.push({
                        id: categoria.id,
                        name: categoria.name,
                        description: categoria.description,
                        banner_url: categoria.banner_url,
                        parent: categoria.parent,
                        position: categoria.position,
                        active: categoria.active,
                        date_created: categoria.created_at
                    })
                })
    
                producto.getRelated('caracteristicas').rows.map((caracteristica) => {
                    caracteristicas.push({
                        id: caracteristica.id,
                        name: caracteristica.name,
                        impact: caracteristica.$relations.pivot.impact,
                        feature_id: caracteristica.caracteristica_id,
                        date_created: caracteristica.created_at
                    })
                })
    
                productos.push({
                    id: producto.id,
                    name: producto.name,
                    reference: producto.reference,
                    price: producto.price,
                    description: producto.description,
                    image_url: producto.image_url,
                    customizable: producto.customizable,
                    store_id: producto.tienda_id,
                    active: producto.active,
                    date_created: producto.created_ad,
                    store: {
                        id: tienda.id,
                        name: tienda.name,
                        brand_id: tienda.marca_id,
                        date_created: tienda.created_at
                    },
                    categories: categorias,
                    features: caracteristicas
                })
            })

            return response.json({
                status: 200,
                products: productos
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

    async store({ request, response }) {
        const body = request.body

        let newProducto = new Producto()
        newProducto.name = body.name
        newProducto.reference = body.reference
        newProducto.price = body.price
        newProducto.description = body.description
        newProducto.imagen_url = body.image_url
        newProducto.customizable = body.customizable
        newProducto.tienda_id = body.tienda_id
        newProducto.active = body.active

        await newProducto.save()
        
        try {
            let idCategoria = body.categoria_id;
            let categoria = Categoria.findOrFail(idCategoria)

            categoria.categorias().save(newProducto)
        } catch (err) {
        }

        let producto = {
            id: newProducto.id,
            name: newProducto.name,
            reference: newProducto.reference,
            price: newProducto.price,
            description: newProducto.description,
            image_url: newProducto.image_url,
            customizable: newProducto.customizable,
            store_id: newProducto.tienda_id,
            active: newProducto.active,
            date_created: newProducto.created_ad
        }

        return response.json({
            status: 200,
            product: producto
        })
    }

    async update({ request, response }) {
        const idProducto = request.params.id
        const productoU = request.body

        try {
            let update = await Producto.findOrFail(idProducto)

            update.name = productoU.name
            update.reference = productoU.reference
            update.price = productoU.price
            update.description = productoU.description
            update.image_url = productoU.image_url
            update.customizable = productoU.customizable
            update.tienda_id = productoU.tienda_id
            update.active = productoU.active

            await update.save()

            let producto = {
                id: update.id,
                name: update.name,
                reference: update.reference,
                price: update.price,
                description: update.description,
                image_url: update.image_url,
                customizable: update.customizable,
                store_id: update.tienda_id,
                active: update.active,
                date_created: update.created_ad
            }

            return response.json({
                status: 200,
                product: producto
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
            let resp = await Producto.findOrFail(idProducto)

            let producto = {
                id: resp.id,
                name: resp.name,
                reference: resp.reference,
                price: resp.price,
                description: resp.description,
                image_url: resp.image_url,
                customizable: resp.customizable,
                store_id: resp.tienda_id,
                active: resp.active,
                date_created: resp.created_ad
            }

            await resp.delete()

            return response.json({
                status: 200,
                product: producto
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
