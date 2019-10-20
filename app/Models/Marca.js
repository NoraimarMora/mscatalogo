'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Marca extends Model {

    static get incrementing () {
        return false
    }
    
    tiendas () {
        return this.hasMany('App/Models/Tienda')
    }

    productos() {
        return this.manyThrough('App/Models/Tienda', 'productos')
    }
}

module.exports = Marca
