import e from 'express'

export const auth_routes = e.Router()

auth_routes.post('/', register)