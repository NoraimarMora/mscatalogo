'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriasSchema extends Schema {
  up () {
    this.create('categorias', (table) => {
      table.increments('id')
      table.string('name')
      table.string('description')
      table.string('banner_url')
      table.string('parent').defaultTo(0)
      table.integer('position')
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('categorias')
  }
}

module.exports = CategoriasSchema
