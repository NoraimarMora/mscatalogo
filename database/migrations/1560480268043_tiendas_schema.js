'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TiendasSchema extends Schema {
  up () {
    this.create('tiendas', (table) => {
      table.integer('id').unsigned().primary('id')
      table.string('name')
      table.integer('marca_id').unsigned()
      table.timestamps()

      table.foreign('marca_id').references('id').inTable('marcas').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('tiendas')
  }
}

module.exports = TiendasSchema
