'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {

    productos () {
        return this.belongsToMany('App/Models/Producto')
    }
}

module.exports = Categoria
