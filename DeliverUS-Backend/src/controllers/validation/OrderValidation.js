import { check } from 'express-validator'
import { Order, Product, Restaurant } from '../../models/models.js'

const checkRestaurantExists = async (value, { req }) => {
  try {
    const restaurant = await Restaurant.findByPk(req.body.restaurantId)
    if (restaurant === null) {
      return Promise.reject(new Error('The restaurantId does not exist.'))
    } else { return Promise.resolve() }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const checkProductsAreAvailable = async (value, { req }) => {
  try {
    const productIds = req.body.products.map(p => p.productId)
    const products = await Product.findAll({ where: { id: productIds } })
    const unavailableProducts = products.filter(p => !p.availability)
    if (unavailableProducts.length > 0) {
      return Promise.reject(new Error('Some products are not available'))
    } else {
      return Promise.resolve()
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const checkProductsBelongToSameRestaurant = async (value, { req }) => {
  try {
    const productIds = req.body.products.map(p => p.productId)
    const products = await Product.findAll({ where: { id: productIds } })
    const restaurantIds = new Set(products.map(p => p.restaurantId))
    if (restaurantIds.size > 1) {
      return Promise.reject(new Error('All products must belong to the same restaurant'))
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}
const checkProductsBelongToSameRestaurantOrigin = async (value, { req }) => {
  try {
    const restaurantIdOriginal = req.body.restaurantId
    const productIds = req.body.products.map(p => p.productId)
    const products = await Product.findAll({ where: { id: productIds } })
    const restaurantIds = new Set(products.map(p => p.restaurantId))
    if (restaurantIds.size > 1 && restaurantIds.has(restaurantIdOriginal)) {
      return Promise.reject(new Error('All products must belong to the same restaurant of the originally saved order that is being edited.'))
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}
// TODO: Include validation rules for create that should:

const create = [
  check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('restaurantId').exists().isInt({ min: 1 }).toInt().custom(checkRestaurantExists), // 1. Check that restaurantId is present in the body and corresponds to an existing restaurant
  check('userId').not().exists(),
  check('products').exists().isArray({ min: 1 }), // 2. Check that products is a non-empty array composed of objects with productId and quantity greater than 0
  check('products.*.productId').exists().isInt({ min: 1 }).toInt(),
  check('products.*.quantity').exists().isInt({ min: 1 }).toInt(),
  check('products').custom(checkProductsAreAvailable), // 3. Check that products are available
  check('products').custom(checkProductsBelongToSameRestaurant), // 4. Check that all the products belong to the same restaurant
  check('products').custom(checkProductsBelongToSameRestaurant)

]
// TODO: Include validation rules for update that should:
// 5. Check that the order is in the 'pending' state.
const update = [
  check('address').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('restaurantId').not().exists(), // 1. Check that restaurantId is NOT present in the body.
  check('userId').not().exists(),
  check('products').exists().isArray({ min: 1 }), // 2. Check that products is a non-empty array composed of objects with productId and quantity greater than 0
  check('products.*.productId').exists().isInt({ min: 1 }).toInt(),
  check('products.*.quantity').exists().isInt({ min: 1 }).toInt(),
  check('products').custom(checkProductsAreAvailable), // 3. Check that products are available
  check('products').custom(checkProductsBelongToSameRestaurantOrigin)// 4. Check that all the products belong to the same restaurant

]

export { create, update }
