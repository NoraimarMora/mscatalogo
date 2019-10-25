'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {

    productos () {
        return this.belongsToMany('App/Models/Producto')
    }

    tiendas () {
        return this.manyThrough('App/Models/Producto', 'tienda')
    }
}

module.exports = Categoria
