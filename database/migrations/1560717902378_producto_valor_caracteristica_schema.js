'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoValorCaracteristicaSchema extends Schema {
  up () {
    this.create('producto_valor_caracteristica', (table) => {
      table.increments('id')
      table.integer('valor_caracteristica_id').unsigned()
      table.integer('producto_id').unsigned()
      table.double('impacto').defaultTo(0)
      table.timestamps()

      table.foreign('valor_caracteristica_id').references('id').inTable('valores_caracteristicas').onDelete(CASCADE)
      table.foreign('producto_id').references('id').inTable('productos').onDelete(CASCADE)
    })
  }

  down () {
    this.drop('producto_valor_caracteristica')
  }
}

module.exports = ProductoValorCaracteristicaSchema
