'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoValorCaracteristicaSchema extends Schema {
  up () {
    this.create('producto_valor_caracteristica', (table) => {
      table.increments('id')
      table.integer('feature_value_id').unsigned()
      table.integer('product_id').unsigned()
      table.double('impact').defaultTo(0)
      table.timestamps()

      table.foreign('feature_value_id').references('id').inTable('valores_caracteristicas').onDelete('CASCADE')
      table.foreign('product_id').references('id').inTable('productos').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('producto_valor_caracteristica')
  }
}

module.exports = ProductoValorCaracteristicaSchema
