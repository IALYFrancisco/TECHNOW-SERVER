import express from 'express'
import dotenv from 'dotenv'
import { router } from './src/routes/app.route.js'
import { auth_routes } from './src/routes/Authentication.js'
import cookieParser from 'cookie-parser'
import { payment_routes } from './src/routes/Payment.js'
import { product_router } from './src/routes/Product.js'

dotenv.config()

const app = express()

app.use(express.static(path.join(__dirname, 'src/public')))

app.use(express.json())

app.use(cookieParser())

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN)
    response.setHeader('Access-Control-Allow-Headers', process.env.ALLOWED_HEADERS_REQUEST)
    response.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use('/', router)

app.use('/authentication', auth_routes)

app.use('/payment', payment_routes)

app.use('/product', product_router)

app.listen( process.env.APP_PORT, ()=>{ console.log(`The application is listening at ${process.env.APP_HOST}`) })
