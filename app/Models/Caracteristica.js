'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Caracteristica extends Model {

    valores () {
        return this.hasMany('App/Models/ValorCaracteristica')
    }
}

module.exports = Caracteristica
