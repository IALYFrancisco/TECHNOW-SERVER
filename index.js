import express from 'express'
import dotenv from 'dotenv'
import { router } from './src/routes/app.route.js'

dotenv.config()

const app = express()

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN)
    next()
})

app.use('/', router)

app.listen( process.env.APP_PORT, ()=>{
    console.log(`http://127.0.0.1:${process.env.APP_PORT}`)
})
