import { ShippingAddress } from '../models/models.js'
import { } from 'sequelize'

const ShippingAddressController = {
  async index (req, res) {
    // TODO
    try {
      const address = await ShippingAddress.findAll(
        {
          attributes: { exclude: ['userId'] },
          where: { userId: req.user.id },
          order: [['createdAt', 'ASC']]
        })
      res.json(address)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async create (req, res) {
    // TODO
    const newAddress = ShippingAddress.build(req.body)
    newAddress.userId = req.user.id // usuario actualmente autenticado
    const address = await ShippingAddress.findAll({ where: { userId: req.user.id } })
    try {
      if (address.length === 0) {
        newAddress.isDefault = true
      }
      const addressCreated = await newAddress.save()
      res.status(201).json(addressCreated)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async update (req, res) {
    try {
      const updatedAddress = await ShippingAddress.findByPk(req.params.shippingAddressId)

      await updatedAddress.update(req.body)
      res.status(200).json(updatedAddress)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async destroy (req, res) {
    try {
      const result = await ShippingAddress.destroy({ where: { id: req.params.shippingAddressId } })
      if (result === 1) {
        res.status(204).send() // esto se sabe por los test que lo indican por eso no funcionan los test si no ponemos lo que devuelve en especifico
      } else {
        res.status(500).send('Could not delete shipping address.')
      }
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async markDefault (req, res) {
    try {
      const address = await ShippingAddress.findByPk(req.params.shippingAddressId) // busca direccion por id
      const userId = address.userId // obtiene el userId de la direccion
      await ShippingAddress.update({ isDefault: false }, { where: { userId } }) // pone el resto de addresses en isDefault en falso
      address.isDefault = true // ahora, la que hemos cogido por el id la ponemos en true
      const updatedAddress = await address.save() // guardamos el address actual
      res.json(updatedAddress)
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

export default ShippingAddressController
