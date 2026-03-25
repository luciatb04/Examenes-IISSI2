// This is a new file for solution!

const create = async function (req, res) {
  const newPerformance = Performance.build(req.body)
  newPerformance.restaurantId = req.restaurant.id // usuario actualmente autenticado
  try {
    const performance = await newPerformance.save()
    res.json(performance)
  } catch (err) {
    res.status(500).send(err)
  }
}

const PerformanceController = {
  create
}
export default PerformanceController
