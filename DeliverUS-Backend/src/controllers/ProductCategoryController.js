import { Product, ProductCategory } from '../models/models.js'
const index = async function (req, res) {
  try {
    const productCategories = await ProductCategory.findAll()
    res.json(productCategories)
  } catch (err) {
    res.status(500).send(err)
  }
}

const create = async function (req, res) {
  const newProductCategory = ProductCategory.build(req.body)
  newProductCategory.userId = req.user.id // usuario actualmente autenticado
  try {
    const productCategory = await newProductCategory.save()
    res.json(productCategory)
  } catch (err) {
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  const numProductsInCategory = await Product.count({
    where: { productCategoryId: req.params.productCategoryId }
  })
  const category = await ProductCategory.findByPk(req.params.productCategoryId)
  if (category === null) {
    return res.status(404).send('The product category does not exist.')
  }

  if (numProductsInCategory > 0) {
    return res.status(409).send('Some products belong to this category.')
  } else {
    try {
      const result = await ProductCategory.destroy({ where: { id: req.params.productCategoryId } })
      if (result === 1) {
        res.status(204).send()
      } else {
        res.status(500).send('Could not delete product category.')
      }
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

const indexByRestaurant = async function (req, res) {
  try {
    const productCategories = await ProductCategory.findAll({
      where: { restaurantId: req.params.restaurantId }
    })
    res.json(productCategories)
  } catch (err) {
    res.status(500).send(err)
  }
}

const indexProductsByCategory = async function (req, res) {
  try {
    const productCategory = await ProductCategory.findByPk(req.params.productCategoryId, {
      include: [
        {
          model: Product,
          as: 'products'
        }
      ]
    })
    if (!productCategory) {
      return res.status(404).send('Product category not found')
    }
    res.json(productCategory.products)
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

const ProductCategoryController = {
  index,
  create,
  destroy,
  indexByRestaurant,
  indexProductsByCategory,
  show

}
export default ProductCategoryController
