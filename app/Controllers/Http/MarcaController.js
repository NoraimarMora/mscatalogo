'use strict'

const Marca = use('App/Models/Marca')

class MarcaController {
    async getAll({ response }) {
        let resp = await Marca.all()
        let marcas = []
        
        resp.rows.map((marca) => {
            marcas.push({
                id: marca.id,
                name: marca.name,
                date_created: marca.created_at
            })
        })

        return response.json({
            status: 200,
            brands: marcas
        })
    } 

    async getById({ request, response }){
        const idMarca = request.params.id

        try{
            let resp = await Marca.findOrFail(idMarca)

            let marca = {
                id: resp.id,
                name: resp.name,
                date_created: resp.created_at
            }

            return response.json({
                status: 200,
                brand: marca
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

        let newMarca = new Marca()
        newMarca.id = body.id
        newMarca.name = body.name

        await newMarca.save()

        let marca = {
            id: newMarca.id,
            name: newMarca.name,
            date_created: newMarca.created_at
        }

        return response.json({
            status: 200,
            brand: marca
        })
    }

    async update({ request, response }) {
        const idMarca = request.params.id
        const marcaU = request.body

        try {
            let update = await Marca.findOrFail(idMarca)

            update.name = marcaU.name

            await update.save()

            let marca = {
                id: update.id,
                name: update.name,
                date_created: update.created_at
            }

            return response.json({
                status: 200,
                brand: marca
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
        const idMarca = request.params.id

        try {
            let resp = await Marca.findOrFail(idMarca)

            let marca = {
                id: resp.id,
                name: resp.name,
                date_created: resp.created_at
            }

            await resp.delete()

            return response.json({
                status: 200,
                brand: marca
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

module.exports = MarcaController
