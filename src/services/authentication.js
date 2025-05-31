import { User } from "../models/User";
import { connection, disconnection } from "./db";

export async function Register(request, response){
    try {
        await connection()
        // let user = await User.find({email:request})
        console.log(request.body)
    }catch(err){

    }finally{
        await disconnection()
    }
}