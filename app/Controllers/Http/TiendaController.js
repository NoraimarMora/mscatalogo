'use strict'

const Tienda = use('App/Models/Tienda')

class TiendaController {
    async getAll({ response }) {
        let resp = await Tienda.all()
        let tiendas = []
        
        resp.rows.map((tienda) => {
            tiendas.push({
                id: tienda.id,
                name: tienda.name,
                brand_id: tienda.marca_id,
                date_created: tienda.created_at
            })
        })

        return response.json({
            status: 200,
            stores: tiendas
        })
    } 

    async getById({ request, response }){
        const idTienda = request.params.id

        try{
            let resp = await Tienda.findOrFail(idTienda)

            let tienda = {
                id: resp.id,
                name: resp.name,
                brand_id: resp.marca_id,
                date_created: resp.created_at
            }

            return response.json({
                status: 200,
                store: tienda
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

        let newTienda = new Tienda()
        newTienda.id = body.id
        newTienda.name = body.name
        newTienda.marca_id = body.marca_id

        await newTienda.save()

        let tienda = {
            id: newTienda.id,
            name: newTienda.name,
            brand_id: newTienda.marca_id,
            date_created: newTienda.created_at
        }

        return response.json({
            status: 200,
            store: tienda
        })
    }

    async update({ request, response }) {
        const idTienda = request.params.id
        const tiendaU = request.body

        try {
            let update = await Tienda.findOrFail(idTienda)

            update.name = tiendaU.name
            update.marca_id = tiendaU.marca_id

            await update.save()

            let tienda = {
                id: update.id,
                name: update.name,
                brand_id: update.marca_id,
                date_created: update.created_at
            }

            return response.json({
                status: 200,
                store: tienda
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
        const idTienda = request.params.id

        try {
            let resp = await Tienda.findOrFail(idTienda)

            let tienda = {
                id: resp.id,
                name: resp.name,
                brand_id: resp.marca_id,
                date_created: resp.created_at
            }

            await resp.delete()

            return response.json({
                status: 200,
                store: tienda
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

module.exports = TiendaController
