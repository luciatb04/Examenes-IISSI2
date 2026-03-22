import { check } from 'express-validator'

const create = [
  check('alias').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('street').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('city').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('zipCode').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('province').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('isDefault').optional().isBoolean().toBoolean()

]

const update = [
  check('isDefault').optional().isBoolean().toBoolean()
]

export { create, update }
