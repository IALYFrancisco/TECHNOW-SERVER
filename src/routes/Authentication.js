import e from 'express'
import { Login, _RefreshToken, Register } from '../services/authentication.js'

export const auth_routes = e.Router()

auth_routes.post('/register', Register)

auth_routes.post('/login', Login)

auth_routes.post('/token', _RefreshToken)