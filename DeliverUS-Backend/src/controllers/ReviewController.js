import { Review } from '../models/models.js'

const ReviewController = {

  async index (req, res) {
    try {
      const reviews = await Review.findAll({
        where: { restaurantId: req.params.restaurantId },
        order: [['createdAt', 'DESC']]
      })
      res.json(reviews)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async create (req, res) {
    const newReview = Review.build(req.body)
    newReview.customerId = req.user.id
    newReview.restaurantId = req.params.restaurantId
    try {
      const review = await newReview.save()
      res.json(review)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async update (req, res) {
    try {
      await Review.update(req.body, {
        where: { id: req.params.reviewId }
      })
      const updatedReview = await Review.findByPk(req.params.reviewId)
      res.json(updatedReview)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async destroy (req, res) {
    try {
      const result = await Review.destroy({ where: { id: req.params.reviewId } })
      let message = ''
      if (result === 1) {
        message = 'Sucessfuly deleted review id.' + req.params.reviewId
      } else {
        message = 'Could not delete review.'
      }
      res.json(message)
    } catch (err) {
      res.status(500).send(err)
    }
  }

}

export default ReviewController
