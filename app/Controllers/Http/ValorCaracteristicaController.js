'use strict'

const ValorCaracteristica = use('App/Models/ValorCaracteristica')

class ValorCaracteristicaController {
    async getAll({ response }) {
        let valoresC = await ValorCaracteristica.all()

        return response.json({
            status: 200,
            valoresC: valoresC
        })
    } 

    async getById({ request, response }){
        const idValorC = request.params.id

        try{
            let valorC = await ValorCaracteristica.findOrFail(idValorC)

            return response.json({
                status: 200,
                valorC: valorC
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

    async getByFeature({ request, response }) {
        const idCaracteristica = request.params.idCaracteristica

        try{
            let valoresC = await ValorCaracteristica.query()
                .where('feature_id', idCaracteristica)
                .fetch()

            return response.json({
                status: 200,
                valoresC: valoresC
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
        const valorC = request.body

        let newValorC = new ValorCaracteristica()
        newValorC.name = valorC.name
        newValorC.feature_id = valorC.feature_id

        await newValorC.save()

        return response.json({
            status: 200,
            valorC: newValorC
        })
    }

    async update({ request, response }) {
        const idValorC = request.params.id
        const valorCU = request.body

        try {
            let valorC = await ValorCaracteristica.findOrFail(idValorC)

            valorC.name = valorCU.name
            valorC.feature_id = valorCU.feature_id

            await valorC.save()

            return response.json({
                status: 200,
                valorC: valorC
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
        const idValorC = request.params.id

        try {
            let valorC = await ValorCaracteristica.findOrFail(idValorC)

            await valorC.delete()

            return response.json({
                status: 200,
                message: "Valor de Caracteristica eliminado"
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

module.exports = ValorCaracteristicaController
