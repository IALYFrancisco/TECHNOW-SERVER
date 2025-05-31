import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function dbConnection() {
    await mongoose.connect(process.env.DB_URI)
        .then(()=>{console.log('Connected to mongodb;')})
        .catch((error)=>{console.log('Error mongodb connection')})
}
