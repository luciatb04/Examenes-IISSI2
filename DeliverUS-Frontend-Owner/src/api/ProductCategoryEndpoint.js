import { get, post, put, destroy } from './helpers/ApiRequestsHelper'
function getAll() {
  return get('productCategories')
}

function getByRestaurant(restaurantId) {
  return get(`productCategories/restaurants/${restaurantId}`)
}

function getDetail(id) {
  return get(`productCategories/${id}`)
}

function getRestaurantCategories() {
  return get('restaurantCategories')
}

function create(data) {
  return post(`productCategories/restaurants/${data.restaurantId}`, data)
}

function update(id, data) {
  return put(`productCategories/${id}`, data)
}

function remove(restaurantId, categoryId) {
  return destroy(`productCategories/${restaurantId}/categories/${categoryId}`)
}

export {
  getAll,
  getByRestaurant,
  getDetail,
  getRestaurantCategories,
  create,
  update,
  remove
}
