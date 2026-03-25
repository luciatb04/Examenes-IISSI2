// This is a new file for solution!
import { check } from 'express-validator'

const checkPerformancesSameDate = async (value, { req }) => {
  try {
    let error = false
    const performances = await Performance.findAll({ where: { restaurantId: req.body.restaurantId } })
    for (const performance of performances) {
      const newPerformanceDate = new Date(req.body.appointment)
      const performanceDateToCompare = performance.appointment
      if (newPerformanceDate.getTime() === performanceDateToCompare.getTime()) {
        error = true
        break
      }
    }
    if (error) {
      return Promise.reject(new Error('No pueden haber dos actuaciones en el mismo día.'))
    } else {
      return Promise.resolve()
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}
const create = [
  check('group').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('appointment').exists().toDate(),
  check('restaurantId').exists({ checkNull: true }).isInt({ min: 1 }).toInt(),
  check('restaurantId').custom(checkPerformancesSameDate)
]

export { create }
