import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connection() {
    await mongoose.connect(process.env.DB_URI)
        .then(()=>{console.log('Connected to mongodb;')})
        .catch((error)=>{console.log('Error mongodb connection')})
}

export async function disconnection() {
    try{
        await mongoose.disconnect().then(()=>console.log("Database disconnection successfull."))
    }catch(err){
        console.log({message: "Error database disconnection.", error: err})
    }
}