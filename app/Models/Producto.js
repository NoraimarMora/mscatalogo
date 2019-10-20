'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {

    tienda () {
        return this.belongsTo('App/Models/Tienda')
    }

    categorias () {
        return this.belongsToMany('App/Models/Categoria')
    }

    caracteristicas () {
        return this.belongsToMany('App/Models/ValorCaracteristica')
            .pivotTable('producto_valor_caracteristica')
            .withPivot(['impact'])
    }
}

module.exports = Producto
