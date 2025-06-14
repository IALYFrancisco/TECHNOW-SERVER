import e from 'express'
import { Pay } from '../services/payment.js'
import { isAuthenticated } from '../services/authentication.js'

export const payment_routes = e.Router()

payment_routes.use(isAuthenticated)

payment_routes.post('/pay', Pay)