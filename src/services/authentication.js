import { User } from "../models/User.js";
import { connection, disconnection } from "./db.js";
import { hash } from 'bcrypt'

export async function Register(request, response){
    try {
        await connection()
        if(!request.body || !request.body.email){
            response.status(400).json({message: "Bad request, parameter missing"})
        }else{
            let user = await User.find({email: request.body.email})
            if(user.length > 0){
                response.status(409).json({message: "User with this email already exist."})
            }else{
                let newUser = User(request.body)
                let result = await newUser.save()
                if (result) response.status(201).json({message: "User registered successfully."})
            }
        }
    }catch(err){
        response.status(500).json({
            message: "User register failed. May be server error.",
            error: err
        })
    }finally{
        await disconnection()
    }
}

export async function HashPassword(p){
    try {
        let _hash = await hash(p, 10)
        return _hash
    }catch(err){
        console.log({message: "Error hashing password."})
    }
}