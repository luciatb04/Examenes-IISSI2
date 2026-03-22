import { ShippingAddress } from '../models/models.js'

export const checkShippingAddressOwnership = async (req, res, next) => {
  // TODO
  try {
    const addresses = await ShippingAddress.findByPk(req.params.shippingAddressId)
    if (!addresses) {
      return res.status(404).json({ message: 'Shipping address not found' })
    }
    if (req.user.id === addresses.userId) {
      return next()
    }
    return res.status(403).send('Not enough privileges. This entity does not belong to you')
  } catch (err) {
    return res.status(500).send(err)
  }
}
