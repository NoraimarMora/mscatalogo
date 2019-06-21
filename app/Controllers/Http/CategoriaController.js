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
            .where('activo', 1)
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
        const idPadre = request.params.idPadre

        try{
            let subcategorias = await Categoria.query()
                .where('padre', idPadre)
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
        const idPadre = request.params.idPadre

        try{
            let subcategorias = await Categoria.query()
                .where('padre', idPadre)
                .where('activo', 1)
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
        let posicion = 1
        let result = await Database.select('posicion')
            .from('categorias')
            .where('padre', categoria.padre)
            .orderBy('id', 'desc')
            .limit(1)
        
        if(typeof result[0].posicion != 'undefined')
            posicion = result[0].posicion + 1

        let newCategoria = new Categoria()
        newCategoria.nombre = categoria.nombre
        newCategoria.descripcion = categoria.descripcion
        newCategoria.banner_url = categoria.banner_url
        newCategoria.padre = categoria.padre
        newCategoria.posicion = posicion
        newCategoria.activo = categoria.activo

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

            categoria.nombre = categoriaU.nombre
            categoria.descripcion = categoriaU.descripcion
            categoria.banner_url = categoriaU.banner_url
            categoria.padre = categoriaU.padre
            categoria.activo = categoriaU.activo

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
