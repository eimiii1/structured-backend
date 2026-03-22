import { z } from 'zod'

const userSchema = z.object({
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/),
    email: z.email(),
    password: z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d).+$/),
    age: z.number().max(18).max(120)
})

export default userSchema