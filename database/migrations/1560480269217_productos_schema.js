'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductosSchema extends Schema {
  up () {
    this.create('productos', (table) => {
      table.increments('id')
      table.string('name')
      table.string('reference')
      table.double('price')
      table.text('description')
      table.string('imagen_url')
      table.boolean('customizable')
      table.integer('store_id').unsigned()
      table.boolean('active')
      table.timestamps()

      table.foreign('store_id').references('id').inTable('tiendas').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('productos')
  }
}

module.exports = ProductosSchema
