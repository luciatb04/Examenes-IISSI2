import { Schedule } from '../models/models.js'

const indexRestaurant = async function (req, res) {
  try {
    const schedules = await Schedule.findAll(
      {
        where: { restaurantId: req.params.restaurantId },
        order: [['startTime', 'ASC']]
      }
    )
    res.json(schedules)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const create = async function (req, res) {
  try {
    const newSchedule = Schedule.build(req.body)
    newSchedule.restaurantId = req.params.restaurantId
    const schedule = await newSchedule.save()
    res.json(schedule)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const update = async function (req, res) {
  try {
    await Schedule.update(req.body, {
      where: { id: req.params.scheduleId, restaurantId: req.params.restaurantId }
    })
    const updatedSchedule = await Schedule.findByPk(req.params.scheduleId)
    res.json(updatedSchedule)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const destroy = async function (req, res) {
  try {
    const result = await Schedule.destroy({ where: { id: req.params.scheduleId, restaurantId: req.params.restaurantId } })
    let message = ''
    if (result === 1) {
      message = 'Successfully deleted schedule id.' + req.params.scheduleId
    } else {
      message = 'Could not delete schedule.'
    }
    res.json(message)
  } catch (err) {
    res.status(500).send(err)
  }
}

const ScheduleController = {
  indexRestaurant,
  create,
  update,
  destroy
}

export default ScheduleController
