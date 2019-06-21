'use strict'

const Caracteristica = use('App/Models/Caracteristica')

class CaracteristicaController {
    async getAll({ response }) {
        let caracteristicas = await Caracteristica.all()

        return response.json({
            status: 200,
            caracteristicas: caracteristicas
        })
    } 

    async getById({ request, response }){
        const idCaracteristica = request.params.id

        try{
            let caracteristica = await Caracteristica.findOrFail(idCaracteristica)

            return response.json({
                status: 200,
                caracteristica: caracteristica
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
        const caracteristica = request.body

        let newCaracteristica = new Caracteristica()
        newCaracteristica.nombre = caracteristica.nombre

        await newCaracteristica.save()

        return response.json({
            status: 200,
            caracteristica: newCaracteristica
        })
    }

    async update({ request, response }) {
        const idCaracteristica = request.params.id
        const caracteristicaU = request.body

        try {
            let caracteristica = await Caracteristica.findOrFail(idCaracteristica)

            caracteristica.nombre = caracteristicaU.nombre

            await caracteristica.save()

            return response.json({
                status: 200,
                caracteristica: caracteristica
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
            let caracteristica = await Caracteristica.findOrFail(idCaracteristica)

            await caracteristica.delete()

            return response.json({
                status: 200,
                message: "Caracteristica eliminada"
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
