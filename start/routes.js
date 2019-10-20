'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Database = use('Database')

Route.get('/', () => 'Microservicio Catalogo')

Route.get('/liveness', ({ response }) => {
    response.send('Microservicio Catalogo')
})

Route.get('/readiness', async ({ response }) => {
    var result = await Database.select('*').from('adonis_schema')
    response.send(result)
})

Route.group(() => {
    Route.get('/', 'ProductoController.getAll')
    Route.get('/:id', 'ProductoController.getById')
    Route.get('/:id/caracteristicas', 'ProductoController.getFeaturesByProduct')
    Route.get('/categoria/:idCategoria', 'ProductoController.getProductsByCategory')
    Route.get('/tienda/:idTienda', 'ProductoController.getProductsByStore')
    Route.get('/tienda/:idTienda/active', 'ProductoController.getActiveProductsByStore')
    Route.get('/:idCategoria/:idTienda', 'ProductoController.getProductsByCategoryAndStore')
    // Route.get('/marca/:idMarca', 'ProductoController.getProductsByBrand')
    Route.post('/', 'ProductoController.store')
    Route.put('/:id', 'ProductoController.update')
    Route.delete('/:id', 'ProductoController.delete')
}).prefix('productos')

Route.group(() => {
    Route.get('/', 'CategoriaController.getAll')
    Route.get('/active', 'CategoriaController.getActive')
    Route.get('/:id', 'CategoriaController.getById')
    Route.get('/:idParent/sub', 'CategoriaController.getSubcategories')
    Route.get('/:idParent/sub/active', 'CategoriaController.getActiveSubcategories')
    Route.post('/', 'CategoriaController.store')
    Route.put('/:id', 'CategoriaController.update')
    Route.delete('/:id', 'CategoriaController.delete')
}).prefix('categorias')

Route.group(() => {
    Route.get('/', 'CaracteristicaController.getAll')
    Route.get('/:id', 'CaracteristicaController.getById')
    Route.post('/', 'CaracteristicaController.store')
    Route.put('/:id', 'CaracteristicaController.update')
    Route.delete('/:id', 'CaracteristicaController.delete')
}).prefix('caracteristicas')

Route.group(() => {
    Route.get('/', 'ValorCaracteristicaController.getAll')
    Route.get('/:id', 'ValorCaracteristicaController.getById')
    Route.get('/:idCaracteristica', 'ValorCaracteristicaController.getByFeature')
    Route.post('/', 'ValorCaracteristicaController.store')
    Route.put('/:id', 'ValorCaracteristicaController.update')
    Route.delete('/:id', 'ValorCaracteristicaController.delete')
}).prefix('valores')

Route.group(() => {
    Route.get('/', 'MarcaController.getAll')
    Route.get('/:id', 'MarcaController.getById')
    Route.get('/:idMarca/productos', 'ProductoController.getProductsByBrand')
    Route.post('/', 'MarcaController.store')
    Route.put('/:id', 'MarcaController.update')
    Route.delete('/:id', 'MarcaController.delete')
}).prefix('marcas')

Route.group(() => {
    Route.get('/', 'TiendaController.getAll')
    Route.get('/:id', 'TiendaController.getById')
    Route.post('/', 'TiendaController.store')
    Route.put('/:id', 'TiendaController.update')
    Route.delete('/:id', 'TiendaController.delete')
}).prefix('tiendas')
