'use strict'

const Caracteristica = use('App/Models/Caracteristica')

class CaracteristicaController {
    async getAll({ response }) {
        let resp = await Caracteristica.all()
        let caracteristicas = []

        resp.rows.map((caracteristica) => {
            caracteristicas.push({
                id: caracteristica.id,
                name: caracteristica.name,
                date_created: caracteristica.created_at
            })
        })

        return response.json({
            status: 200,
            features: caracteristicas
        })
    } 

    async getById({ request, response }){
        const idCaracteristica = request.params.id

        try{
            let resp = await Caracteristica.findOrFail(idCaracteristica)

            let caracteristica = {
                id: resp.id,
                name: resp.name,
                date_created: resp.created_at
            }

            return response.json({
                status: 200,
                feature: caracteristica
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

        let newCaracteristica = new Caracteristica()
        newCaracteristica.name = body.name

        await newCaracteristica.save()

        let caracteristica = {
            id: newCaracteristica.id,
            name: newCaracteristica.name,
            date_created: newCaracteristica.created_at
        }

        return response.json({
            status: 200,
            feature: caracteristica
        })
    }

    async update({ request, response }) {
        const idCaracteristica = request.params.id
        const caracteristicaU = request.body

        try {
            let update = await Caracteristica.findOrFail(idCaracteristica)

            update.name = caracteristicaU.name

            await update.save()

            let caracteristica = {
                id: update.id,
                name: update.name,
                date_created: update.created_at
            }

            return response.json({
                status: 200,
                feature: caracteristica
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
        const idCaracteristica = request.params.id

        try {
            let resp = await Caracteristica.findOrFail(idCaracteristica)

            let caracteristica = {
                id: resp.id,
                name: resp.name,
                date_created: resp.created_at
            }

            await resp.delete()

            return response.json({
                status: 200,
                feature: caracteristica
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

module.exports = CaracteristicaController
