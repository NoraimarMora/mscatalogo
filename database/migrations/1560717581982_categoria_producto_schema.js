'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaProductoSchema extends Schema {
  up () {
    this.create('categoria_producto', (table) => {
      table.increments('id')
      table.integer('category_id').unsigned()
      table.integer('product_id').unsigned()
      table.timestamps()

      table.foreign('category_id').references('id').inTable('categorias').onDelete('CASCADE')
      table.foreign('product_id').references('id').inTable('productos').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('categoria_producto')
  }
}

module.exports = CategoriaProductoSchema
