import sign from "jsonwebtoken/sign.js";
import { User } from "../models/User.js";
import { connection, disconnection } from "./db.js";
import { compare, hash } from 'bcrypt'
import verify from "jsonwebtoken/verify.js";

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
                newUser.password = await HashPassword(newUser.password)
                let result = await newUser.save()
                if (result) response.status(201).json({
                    message: "User registered successfully."
                })
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

export async function Login(request, response) {
    try {
        await connection()
        let { email, password } = request.body
        let _user = await User.findOne({ email: email })
        if(!_user || !await ComparePassword(password, _user.password)){
            return response.status(401).json({
                message: "Invalid credentials"
            })
        }
        
        let newAccessToken = await GenerateAccessToken(_user._id)
        let newRefreshToken = await GenerateRefreshToken(_user._id)

        response.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        })

        response.status(200).json({
            message: "User exist, he can connect.",
            accessToken: newAccessToken,
            user: _user
        })

    }catch(err){
        response.status(500).json({
            message: "Error user login",
            error: err
        })
    }finally{
        await disconnection()
    }
}

export async function Logout(request, response) {
    try{
        let token = request.cookies.refreshToken
        response.clearCookie('refreshToken', { path: '/' })
        response.status(204).end()
    }catch(err){
        console.log(err)
    }
}

async function HashPassword(p){
    try {
        let _hash = await hash(p, 10)
        return _hash
    }catch(err){
        console.log({message: "Error hashing password."})
    }
}

async function ComparePassword(pl, hd) {
    try{
        let result = await compare(pl, hd)
        return result
    }catch(err){
        console.log({
            message: "Error comparing password",
            error: err
        })
    }
}

async function GenerateAccessToken(UID) {
    try {
        let newAccessToken = await sign({ id: UID }, process.env.TOKENS_SECRET, { expiresIn: '15min' })
        return newAccessToken
    }catch(err){
        console.log({
            message: "Error generating access token.",
            error: err
        })
    }
}

async function GenerateRefreshToken(UID){
    try{
        let newRefreshToken = await sign({ id: UID }, process.env.TOKENS_SECRET, { expiresIn: '7d' })
        return newRefreshToken
    }catch(err){
        console.log({
            message: "Error generating refresh token.",
            error: err
        })
    }
}

export async function _RefreshToken(request, response){
    let token = request.cookies.refreshToken

    if (!token) return response.status(401).json({
        message: "You aren't authorized to refresh token. No refresh token provided."
    })

    try {
        
        verify(token, process.env.TOKENS_SECRET, async (error, user) => {
            if(error){
                if (error.name === 'TokenExpiredError'){
                    return response.status(403).json({ message: "Refresh token expired." })
                }
                return response.status(403).json({ message: "Refresh token isn't valid." })
            }
            let newAccessToken = await GenerateAccessToken(user._id)
            let newRefreshToken = await GenerateRefreshToken(user._id)
            response.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/'
            })
            response.status(201).json({
                message: "Tokens refreshed successfully.",
                accessToken: newAccessToken
            })
        })

    }catch(err){
        response.status(500).json({
            message: "Error refreshing tokens. May be server error."
        })
    }
}

export function isAuthenticated(request, response, next){
    let authHeader = request.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if(!token) return response.status(401).json({
        message: "No access token provided."
    })
    verify(token, process.env.TOKENS_SECRET, (err, user) => {
        if(err){
            if (err.name === 'TokenExpiredError'){
                return response.status(403).json({ message: "Access token expired." })
            }
            return response.status(403).json({ message: "Access token isn't valid." })
        }
        request.user = user
        next()
    })
}