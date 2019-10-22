'use strict'

const ValorCaracteristica = use('App/Models/ValorCaracteristica')

class ValorCaracteristicaController {
    async getAll({ response }) {
        let valoresC = await ValorCaracteristica.query()
            .with('caracteristica')
            .fetch()
        let valores = []

        valoresC.rows.map((valor) => {
            let caracteristica = valor.getRelated('caracteristica')

            valores.push({
                id: valor.id,
                name: valor.name,
                feature_id: valor.caracteristica_id,
                feature: {
                    id: caracteristica.id,
                    name: caracteristica.name,
                    date_created: caracteristica.created_at
                },
                date_created: valor.created_at
            })
        })

        return response.json({
            status: 200,
            feature_values: valores
        })
    } 

    async getById({ request, response }){
        const idValorC = request.params.id

        try{
            let resp = await ValorCaracteristica.findOrFail(idValorC)
            await resp.load('caracteristica')
            let caracteristica = resp.getRelated('caracteristica')

            let valorC = {
                id: resp.id,
                name: resp.name,
                feature_id: resp.caracteristica_id,
                feature: {
                    id: caracteristica.id,
                    name: caracteristica.name,
                    date_created: caracteristica.created_at
                },
                date_created: resp.created_at
            }

            return response.json({
                status: 200,
                feature_value: valorC
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
                .where('caracteristica_id', idCaracteristica)
                .fetch()
            let valores = []

            valoresC.rows.map((valor) => {
                await valor.load('caracteristica')
                let caracteristica = valor.getRelated('caracteristica')
        
                valores.push({
                    id: valor.id,
                    name: valor.name,
                    feature_id: valor.caracteristica_id,
                    feature: {
                        id: caracteristica.id,
                        name: caracteristica.name,
                        date_created: caracteristica.created_at
                    },
                    date_created: valor.created_at
                })
            })

            return response.json({
                status: 200,
                feature_values: valores
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
        newValorC.caracteristica_id = valorC.caracteristica_id

        await newValorC.save()

        let valor = {
            id: newValorC.id,
            name: newValorC.name,
            feature_id: newValorC.caracteristica_id,
            date_created: newValorC.created_at
        }

        // TODO: Publish `product-characteristic-created`

        return response.json({
            status: 200,
            feature_value: valor
        })
    }

    async update({ request, response }) {
        const idValorC = request.params.id
        const valorCU = request.body

        try {
            let valorC = await ValorCaracteristica.findOrFail(idValorC)

            valorC.name = valorCU.name
            valorC.caracteristica_id = valorCU.caracteristica_id

            await valorC.save()

            let valor = {
                id: valorC.id,
                name: valorC.name,
                feature_id: valorC.caracteristica_id,
                date_created: valorC.created_at
            }

            // TODO: Publish `product-characteristic-updated`

            return response.json({
                status: 200,
                valorC: valor
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

            let valor = {
                id: valorC.id,
                name: valorC.name,
                feature_id: valorC.caracteristica_id,
                date_created: valorC.created_at
            }

            await valorC.delete()

            // TODO: Publish `product-characteristic-deleted`

            return response.json({
                status: 200,
                feature_value: valor
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
