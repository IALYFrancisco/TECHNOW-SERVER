import e from 'express'
import { Login, _RefreshToken, Register, Logout, VerifyToken } from '../services/authentication.js'

export const auth_routes = e.Router()

auth_routes.post('/register', Register)

auth_routes.post('/login', Login)

auth_routes.post('/logout', Logout)

auth_routes.post('/token/refresh', _RefreshToken)

auth_routes.post('/token/verify', VerifyToken)