import { ProductCategory } from '../models/models.js'
const index = async function (req, res) {
  try {
    const productCategories = await ProductCategory.findAll()
    res.json(productCategories)
  } catch (err) {
    res.status(500).send(err)
  }
}

const show = async function (req, res) {
  try {
    const productCategory = await ProductCategory.findByPk(req.params.productCategoryId)
    res.json(productCategory)
  } catch (err) {
    res.status(500).send(err)
  }
}

const create = async function (req, res) {
  const newProductCategory = ProductCategory.build(req.body)
  newProductCategory.restaurantId = req.params.restaurantId
  try {
    const productCategory = await newProductCategory.save()
    res.json(productCategory)
  } catch (err) {
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  try {
    const result = await ProductCategory.destroy({ where: { id: req.params.categoryId } })
    if (result === 1) {
      return res.status(204).send()
    }
    return res.status(404).send('Not found')
  } catch (err) {
    res.status(500).send(err)
  }
}

const indexRestaurant = async function (req, res) {
  try {
    const products = await ProductCategory.findAll({
      where: {
        restaurantId: req.params.restaurantId
      }

    })
    res.json(products)
  } catch (err) {
    res.status(500).send(err)
  }
}

const ProductCategoryController = {
  index,
  show,
  create,
  destroy,
  indexRestaurant
}
export default ProductCategoryController
