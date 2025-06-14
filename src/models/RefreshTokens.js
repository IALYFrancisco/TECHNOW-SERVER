import { model, Schema } from "mongoose";

const RefreshTokensSchema = new Schema({
    user_id: { type: String, required: true },
    refresh_token: { type: String, required: true },
    generation_date: { type: Date, required: true, default: Date.now }
})

export const RefreshToken = new model('RefreshTokens', RefreshTokensSchema)