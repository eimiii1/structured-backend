import express from 'express'
import { z } from 'zod'

const userSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.email(),
    
})