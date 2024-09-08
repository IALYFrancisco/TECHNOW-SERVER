import express from 'express'
import dotenv from 'dotenv'
import { router } from './src/routes/app.route.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN)
    response.setHeader('Access-Control-Allow-Headers', process.env.ALLOWED_HEADERS_REQUEST)
    next()
})

app.use('/', router)

app.listen( process.env.APP_PORT, ()=>{
    console.log(`http://127.0.0.1:${process.env.APP_PORT}`)
})
