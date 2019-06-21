'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ValorCaracteristica extends Model {

    caracteristica () {
        return this.belongsTo('App/Models/Caracteristica')
    }

    productos () {
        return this.belongsToMany('App/Models/Producto')
    }
}

module.exports = ValorCaracteristica
