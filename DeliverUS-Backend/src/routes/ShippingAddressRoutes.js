import ShippingAddressController from '../controllers/ShippingAddressController.js'
import * as ShippingAddressValidation from '../controllers/validation/ShippingAddressValidation.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import { ShippingAddress } from '../models/models.js'
import { checkShippingAddressOwnership } from '../middlewares/ShippingAddressMiddleware.js'

const loadShippingAddressRoutes = function (app) {
  // TODO: Implement the routes for shipping addresses
  app.route('/shippingaddresses')
    .get(
      isLoggedIn,
      hasRole('customer'),
      ShippingAddressController.index
    )
    .post(
      isLoggedIn,
      hasRole('customer'),
      ShippingAddressValidation.create,
      handleValidation,
      ShippingAddressController.create
    )
  app.route('/shippingaddresses/:shippingAddressId/default')
    .patch(
      isLoggedIn,
      hasRole('customer'),
      checkEntityExists(ShippingAddress, 'shippingAddressId'),

      checkShippingAddressOwnership,
      ShippingAddressController.markDefault
    )
  app.route('/shippingaddresses/:shippingAddressId')
    .put(
      isLoggedIn,
      hasRole('customer'),
      checkEntityExists(ShippingAddress, 'shippingAddressId'),

      checkShippingAddressOwnership,
      ShippingAddressValidation.update,
      handleValidation,
      ShippingAddressController.update
    )
    .delete(
      isLoggedIn,
      hasRole('customer'),
      checkEntityExists(ShippingAddress, 'shippingAddressId'),

      checkShippingAddressOwnership,
      ShippingAddressController.destroy

    )
}

export default loadShippingAddressRoutes
