'use strict'

const Categoria = use('App/Models/Categoria')
const Database = use('Database')

class CategoriaController {
    async getAll({ response }) {
        let categorias = await Categoria.all()

        return response.json({
            status: 200,
            categorias: categorias
        })
    } 

    async getActive({ response }) {
        let categorias = await Categoria.query()
            .where('active', 1)
            .fetch()

        return response.json({
            status: 200,
            categorias: categorias
        })
    }

    async getById({ request, response }){
        const idCategoria = request.params.id

        try{
            let categoria = await Categoria.findOrFail(idCategoria)

            return response.json({
                status: 200,
                categoria: categoria
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

    async getSubcategories({ request, response }){
        const idParent = request.params.idParent

        try{
            let subcategorias = await Categoria.query()
                .where('parent', idParent)
                .fetch()

            return response.json({
                status: 200,
                categorias: subcategorias
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

    async getActiveSubcategories({ request, response }){
        const idParent = request.params.idParent

        try{
            let subcategorias = await Categoria.query()
                .where('parent', idParent)
                .where('active', 1)
                .fetch()

            return response.json({
                status: 200,
                categorias: subcategorias
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
        const categoria = request.body
        let position = 1
        let result = await Database.select('position')
            .from('categorias')
            .where('parent', categoria.parent)
            .orderBy('id', 'desc')
            .limit(1)
        
        if(typeof result[0].position != 'undefined')
            position = result[0].position + 1

        let newCategoria = new Categoria()
        newCategoria.name = categoria.name
        newCategoria.description = categoria.description
        newCategoria.banner_url = categoria.banner_url
        newCategoria.parent = categoria.parent
        newCategoria.position = position
        newCategoria.active = categoria.active

        await newCategoria.save()

        return response.json({
            status: 200,
            categoria: newCategoria
        })
    }

    async update({ request, response }) {
        const idCategoria = request.params.id
        const categoriaU = request.body

        try {
            let categoria = await Categoria.findOrFail(idCategoria)

            categoria.name = categoriaU.name
            categoria.description = categoriaU.description
            categoria.banner_url = categoriaU.banner_url
            categoria.parent = categoriaU.parent
            categoria.active = categoriaU.active

            await categoria.save()

            return response.json({
                status: 200,
                categoria: categoria
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
        const idCategoria = request.params.id

        try {
            let categoria = await Categoria.findOrFail(idCategoria)

            await categoria.delete()

            return response.json({
                status: 200,
                message: "Categoria eliminada"
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

module.exports = CategoriaController
