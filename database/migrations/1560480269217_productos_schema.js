'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductosSchema extends Schema {
  up () {
    this.create('productos', (table) => {
      table.increments('id')
      table.string('nombre')
      table.string('referencia')
      table.double('precio')
      table.text('descripcion')
      table.string('imagen_url')
      table.boolean('personalizable')
      table.boolean('activo')
      table.timestamps()
    })
  }

  down () {
    this.drop('productos')
  }
}

module.exports = ProductosSchema
