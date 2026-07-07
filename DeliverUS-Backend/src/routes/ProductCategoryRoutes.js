import ProductCategoryController from '../controllers/ProductCategoryController.js'
import * as ProductCategoryValidation from '../controllers/validation/ProductCategoryValidation.js'

import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import * as RestaurantMiddleware from '../middlewares/RestaurantMiddleware.js'

import { Restaurant } from '../models/models.js'
const loadFileRoutes = function (app) {
  app.route('/productCategories')
    .get(ProductCategoryController.index)

  app.route('/productCategories/restaurants/:restaurantId')
    .get(
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      RestaurantMiddleware.checkRestaurantOwnership,
      ProductCategoryController.indexRestaurant)
    .post(
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      RestaurantMiddleware.checkRestaurantOwnership,
      ProductCategoryValidation.create,
      handleValidation,
      ProductCategoryController.create
    )

  app.route('/productCategories/:restaurantId/categories/:categoryId')
    .delete(
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      RestaurantMiddleware.checkRestaurantOwnership,
      ProductCategoryController.destroy
    )
}
export default loadFileRoutes
