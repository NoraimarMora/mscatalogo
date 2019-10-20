'use strict'

const Categoria = use('App/Models/Categoria')
const Database = use('Database')

class CategoriaController {
    async getAll({ response }) {
        let resp = await Categoria.all()
        let categorias = []

        resp.rows.map((categoria) => {
            categorias.push({
                id: categoria.id,
                name: categoria.name,
                description: categoria.description,
                banner_url: categoria.banner_url,
                parent: categoria.parent,
                position: categoria.parent,
                active: categoria.active,
                date_created: categoria.created_at
            })
        })

        return response.json({
            status: 200,
            categories: categorias
        })
    } 

    async getActive({ response }) {
        let resp = await Categoria.query()
            .where('active', 1)
            .fetch()
        let categorias = []

        resp.rows.map((categoria) => {
            categorias.push({
                id: categoria.id,
                name: categoria.name,
                description: categoria.description,
                banner_url: categoria.banner_url,
                parent: categoria.parent,
                position: categoria.parent,
                active: categoria.active,
                date_created: categoria.created_at
            })
        })
        
        return response.json({
            status: 200,
            categories: categorias
        })
    }

    async getById({ request, response }){
        const idCategoria = request.params.id

        try{
            let resp = await Categoria.findOrFail(idCategoria)

            let categoria = {
                id: resp.id,
                name: resp.name,
                description: resp.description,
                banner_url: resp.banner_url,
                parent: resp.parent,
                position: resp.parent,
                active: resp.active,
                date_created: resp.created_at
            }

            return response.json({
                status: 200,
                category: categoria
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
            let resp = await Categoria.query()
                .where('parent', idParent)
                .fetch()
            let subcategorias = []

            resp.rows.map((categoria) => {
                subcategorias.push({
                    id: categoria.id,
                    name: categoria.name,
                    description: categoria.description,
                    banner_url: categoria.banner_url,
                    parent: categoria.parent,
                    position: categoria.parent,
                    active: categoria.active,
                    date_created: categoria.created_at
                })
            })

            return response.json({
                status: 200,
                categories: subcategorias
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
            let resp = await Categoria.query()
                .where('parent', idParent)
                .where('active', 1)
                .fetch()
            let subcategorias = []

            resp.rows.map((categoria) => {
                subcategorias.push({
                    id: categoria.id,
                    name: categoria.name,
                    description: categoria.description,
                    banner_url: categoria.banner_url,
                    parent: categoria.parent,
                    position: categoria.parent,
                    active: categoria.active,
                    date_created: categoria.created_at
                })
            })

            return response.json({
                status: 200,
                categories: subcategorias
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
        let position = 1
        let result = await Database.select('position')
            .from('categorias')
            .where('parent', body.parent)
            .orderBy('id', 'desc')
            .limit(1)
        
        if (result.lenght > 0) {
            console.log(result)
            if(result[0].position != undefined)
                position = result[0].position + 1
        }
        let newCategoria = new Categoria()
        newCategoria.name = body.name
        newCategoria.description = body.description
        newCategoria.banner_url = body.banner_url
        newCategoria.parent = body.parent
        newCategoria.position = position
        newCategoria.active = body.active

        await newCategoria.save()

        let categoria = {
            id: newCategoria.id,
            name: newCategoria.name,
            description: newCategoria.description,
            banner_url: newCategoria.banner_url,
            parent: newCategoria.parent,
            position: newCategoria.parent,
            active: newCategoria.active,
            date_created: newCategoria.created_at
        }
        
        return response.json({
            status: 200,
            category: categoria
        })
    }

    async update({ request, response }) {
        const idCategoria = request.params.id
        const categoriaU = request.body

        try {
            let update = await Categoria.findOrFail(idCategoria)

            update.name = categoriaU.name
            update.description = categoriaU.description
            update.banner_url = categoriaU.banner_url
            update.parent = categoriaU.parent
            update.active = categoriaU.active

            await update.save()

            let categoria = {
                id: update.id,
                name: update.name,
                description: update.description,
                banner_url: update.banner_url,
                parent: update.parent,
                position: update.parent,
                active: update.active,
                date_created: update.created_at
            }

            return response.json({
                status: 200,
                category: categoria
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
            let resp = await Categoria.findOrFail(idCategoria)

            let categoria = {
                id: resp.id,
                name: resp.name,
                description: resp.description,
                banner_url: resp.banner_url,
                parent: resp.parent,
                position: resp.parent,
                active: resp.active,
                date_created: resp.created_at
            }

            await resp.delete()

            return response.json({
                status: 200,
                category: categoria
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
