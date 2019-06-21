'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriasSchema extends Schema {
  up () {
    this.create('categorias', (table) => {
      table.increments('id')
      table.string('nombre')
      table.string('descripcion')
      table.string('banner_url')
      table.string('padre').defaultTo(0)
      table.integer('posicion')
      table.boolean('activo')
      table.timestamps()
    })
  }

  down () {
    this.drop('categorias')
  }
}

module.exports = CategoriasSchema
