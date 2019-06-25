'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tienda extends Model {

    static get incrementing () {
        return false
    }

    productos () {
        return this.hasMany('App/Models/Producto')
    }
}

module.exports = Tienda
