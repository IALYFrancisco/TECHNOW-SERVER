import e from 'express'
import { Pay } from '../services/payment'

export const payment_routes = e.Router()

payment_routes.post('/pay', Pay)