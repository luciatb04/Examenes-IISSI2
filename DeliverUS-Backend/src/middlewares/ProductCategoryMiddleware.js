import { Restaurant, ProductCategory, Product } from '../models/models.js'
const checkProductCategoryOwnership = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId)
    if (req.user.id === restaurant.userId) {
      return next()
    }
    return res.status(403).send('Not enough privileges. This entity does not belong to you')
  } catch (err) {
    return res.status(500).send(err)
  }
}

const checkNoProductsInCategory = async (req, res, next) => {
  try {
    const numberOfProductsInCategory = await Product.count({

      where: { productCategoryId: req.params.categoryId }
    })
    if (numberOfProductsInCategory === 0) {
      return next()
    }
    return res.status(409).send('Some products belong to this category.')
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export { checkProductCategoryOwnership, checkNoProductsInCategory }
