'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {

    tiendas () {
        return this.belongsToMany('App/Models/Tienda')
    }

    categorias () {
        return this.belongsToMany('App/Models/Categoria')
    }

    caracteristicas () {
        return this.belongsToMany('App/Models/ValorCaracteristica')
            .pivotTable('product_valor_caracteristica')
            .withPivot(['impacto'])
    }
}

module.exports = Producto
