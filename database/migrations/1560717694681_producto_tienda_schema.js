'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductoTiendaSchema extends Schema {
  up () {
    this.create('producto_tienda', (table) => {
      table.increments('id')
      table.integer('tienda_id').unsigned()
      table.integer('producto_id').unsigned()
      table.timestamps()

      table.foreign('tienda_id').references('id').inTable('tiendas').onDelete(CASCADE)
      table.foreign('producto_id').references('id').inTable('productos').onDelete(CASCADE)
    })
  }

  down () {
    this.drop('producto_tienda')
  }
}

module.exports = ProductoTiendaSchema
