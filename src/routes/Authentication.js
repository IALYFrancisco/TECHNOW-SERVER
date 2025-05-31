import e from 'express'
import { Register } from '../services/authentication.js'

export const auth_routes = e.Router()

auth_routes.post('/register', Register)